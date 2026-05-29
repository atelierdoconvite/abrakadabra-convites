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

    const { data } = await supabase
      .from("produtos")
      .select("*")
      .order("id", { ascending: false });

    setProdutos(data || []);

  }

  async function adicionarProduto() {

    let imagemUrl = null;

    if (imagem) {

      const nomeArquivo = `${Date.now()}.png`;

      const { error: erroUpload } = await supabase
        .storage
        .from("produtos")
        .upload(nomeArquivo, imagem);

      if (erroUpload) {
        alert("Erro upload");
        return;
      }

      const { data } = supabase
        .storage
        .from("produtos")
        .getPublicUrl(nomeArquivo);

      imagemUrl = data.publicUrl;

    }

    if (editandoId) {

      await supabase
        .from("produtos")
        .update({
          titulo,
          descricao,
          preco: Number(preco),
          ...(imagemUrl && { imagem: imagemUrl }),
        })
        .eq("id", editandoId);

      alert("Produto atualizado!");

      setEditandoId(null);

    } else {

      await supabase
        .from("produtos")
        .insert([
          {
            titulo,
            descricao,
            preco: Number(preco),
            imagem: imagemUrl,
          },
        ]);

      alert("Produto adicionado!");

    }

    setTitulo("");
    setDescricao("");
    setPreco("");
    setImagem(null);

    carregarProdutos();

  }

  async function excluirProduto(id) {

    await supabase
      .from("produtos")
      .delete()
      .eq("id", id);

    carregarProdutos();

  }

  function editarProduto(produto) {

    setTitulo(produto.titulo);
    setDescricao(produto.descricao);
    setPreco(produto.preco);

    setEditandoId(produto.id);

  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10 text-pink-500">
        Painel Admin
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-xl mb-10">

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

        <button
          onClick={adicionarProduto}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl font-bold"
        >
          {editandoId ? "Atualizar Produto" : "Adicionar Produto"}
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {produtos.map((produto) => (

          <div
            key={produto.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg"
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

              <p className="text-gray-600 mb-4">
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