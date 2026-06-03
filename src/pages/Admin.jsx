import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Admin() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);

  const [produtos, setProdutos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setProdutos(data || []);
  }

  async function salvarProduto() {
    let imagemUrl = null;

    if (imagem) {
      const nomeArquivo = `${Date.now()}-${imagem.name}`;

      const { error: erroUpload } = await supabase.storage
        .from("produtos")
        .upload(nomeArquivo, imagem);

      if (erroUpload) {
        console.log(erroUpload);
        alert("Erro ao fazer upload da imagem");
        return;
      }

      const { data } = supabase.storage
        .from("produtos")
        .getPublicUrl(nomeArquivo);

      imagemUrl = data.publicUrl;
    }

    // EDITAR
    if (editandoId) {
      const dadosAtualizacao = {
        titulo,
        descricao,
        preco: Number(preco),
      };

      if (imagemUrl) {
        dadosAtualizacao.imagem = imagemUrl;
      }

      const { error } = await supabase
        .from("produtos")
        .update(dadosAtualizacao)
        .eq("id", editandoId);

      if (error) {
        console.log(error);
        alert("Erro ao atualizar produto");
        return;
      }

      alert("Produto atualizado com sucesso!");
    }

    // NOVO PRODUTO
    else {
      const { error } = await supabase
        .from("produtos")
        .insert([
          {
            titulo,
            descricao,
            preco: Number(preco),
            imagem: imagemUrl,
          },
        ]);

      if (error) {
        console.log(error);
        alert("Erro ao salvar produto");
        return;
      }

      alert("Produto adicionado com sucesso!");
    }

    limparFormulario();
    carregarProdutos();
  }

  async function excluirProduto(id) {
    const confirmar = confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("produtos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Erro ao excluir produto");
      return;
    }

    carregarProdutos();
  }

  function editarProduto(produto) {
    setTitulo(produto.titulo);
    setDescricao(produto.descricao);
    setPreco(produto.preco);
    setEditandoId(produto.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setPreco("");
    setImagem(null);
    setEditandoId(null);
  }

  return (
    <div
  className="min-h-screen p-8"
  style={{
    background: "#fdf8f5",
  }}
>
      <div className="text-center mb-12">

  <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full">
    ✨ Área Administrativa
  </span>

  <h1 className="text-6xl font-bold mt-6 text-[#2b1b14]">
    Abrakadabra Convites
  </h1>

  <p className="text-gray-500 mt-4 text-lg">
    Gerencie seus convites digitais, imagens e preços em um único lugar.
  </p>

</div>

      {/* FORMULÁRIO */}

      <div
  className="bg-white p-8 rounded-[30px] shadow-xl mb-12"
  style={{
    maxWidth: "900px",
    margin: "0 auto",
  }}
>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
  type="file"
  onChange={(e) => setImagem(e.target.files[0])}
  className="w-full border p-4 rounded-xl mb-6"
/>

{imagem && (
  <div className="mb-6">
    <img
      src={URL.createObjectURL(imagem)}
      alt="Preview"
      className="w-72 rounded-3xl shadow-lg"
    />
  </div>
)}
        <button
  onClick={salvarProduto}
  className="w-full text-white p-4 rounded-xl font-bold"
  style={{
    background:
      "linear-gradient(135deg,#ec4899,#a855f7)",
  }}
>
  {editandoId
    ? "Atualizar Convite"
    : "Adicionar Convite"}
</button>

        {editandoId && (
          <button
            onClick={limparFormulario}
            className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-xl font-bold"
          >
            Cancelar Edição
          </button>
        )}
      </div>
<h2
  className="text-center text-4xl font-bold mb-10"
  style={{
    color: "#2b1b14",
  }}
>
  ✨ Convites Cadastrados
</h2>
      {/* PRODUTOS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="
bg-white
rounded-[30px]
overflow-hidden
shadow-xl
hover:shadow-2xl
hover:-translate-y-2
transition
duration-300
"
          >
            <img
              src={produto.imagem}
              alt={produto.titulo}
              className="w-full h-72 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {produto.titulo}
              </h2>

              <p className="text-gray-600 mb-3">
                {produto.descricao}
              </p>

              <h3 className="text-pink-500 text-2xl font-bold mb-4">
                R$ {produto.preco}
              </h3>

              <button
                onClick={() => editarProduto(produto)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl mb-3"
              >
                Editar
              </button>

              <button
                onClick={() => excluirProduto(produto.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}