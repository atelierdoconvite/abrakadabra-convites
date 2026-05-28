import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Admin() {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);

  const [editandoId, setEditandoId] = useState(null);

  const [produtos, setProdutos] = useState([]);

  // carregar produtos
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

    setProdutos(data);

  }

  // adicionar ou editar
  async function adicionarProduto() {

    let imagemUrl = null;

    // upload imagem
    if (imagem) {

      const nomeArquivo = `${Date.now()}.png`;

      const { error: erroUpload } = await supabase
        .storage
        .from("produtos")
        .upload(nomeArquivo, imagem);

      if (erroUpload) {
        console.log("ERRO UPLOAD:", erroUpload);
        alert("Erro upload");
        return;
      }

      const { data } = supabase
        .storage
        .from("produtos")
        .getPublicUrl(nomeArquivo);

      imagemUrl = data.publicUrl;

    }

    // editar produto
    if (editandoId) {

      const { error } = await supabase
        .from("produtos")
        .update({
          titulo,
          descricao,
          preco: Number(preco),
          ...(imagemUrl && { imagem: imagemUrl }),
        })
        .eq("id", editandoId);

      if (error) {
        console.log(error);
        alert("Erro ao atualizar");
        return;
      }

      alert("Produto atualizado!");

      setEditandoId(null);

    }

    // novo produto
    else {

      if (!imagemUrl) {
        alert("Escolha uma imagem");
        return;
      }

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

      alert("Produto adicionado!");

    }

    // limpar
    setTitulo("");
    setDescricao("");
    setPreco("");
    setImagem(null);

    carregarProdutos();

  }

  // excluir
  async function excluirProduto(id) {

    const { error } = await supabase
      .from("produtos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Erro ao excluir");
      return;
    }

    carregarProdutos();

  }

  // editar
  function editarProduto(produto) {

    setTitulo(produto.titulo);
    setDescricao(produto.descricao);
    setPreco(produto.preco);

    setEditandoId(produto.id);

  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          marginBottom: "30px",
          fontSize: "40px",
        }}
      >
        Painel Admin
      </h1>

      {/* formulário */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "40px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          style={inputStyle}
        />

        <input
          type="file"
          onChange={(e) => setImagem(e.target.files[0])}
          style={inputStyle}
        />

        <button
          onClick={adicionarProduto}
          style={botaoAdicionar}
        >
          {editandoId ? "Atualizar Produto" : "Adicionar Produto"}
        </button>

      </div>

      {/* lista */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >

        {produtos.map((produto) => (

          <div
            key={produto.id}
            style={{
              background: "white",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >

            <img
              src={produto.imagem}
              alt={produto.titulo}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "20px" }}>

              <h2>{produto.titulo}</h2>

              <p>{produto.descricao}</p>

              <h3>R$ {produto.preco}</h3>

              <button
                onClick={() => editarProduto(produto)}
                style={botaoEditar}
              >
                Editar
              </button>

              <button
                onClick={() => excluirProduto(produto.id)}
                style={botaoExcluir}
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

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const botaoAdicionar = {
  background: "#ff4d8d",
  color: "white",
  border: "none",
  padding: "15px",
  width: "100%",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};

const botaoEditar = {
  background: "#4d79ff",
  color: "white",
  border: "none",
  padding: "10px",
  width: "100%",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "10px",
};

const botaoExcluir = {
  background: "#ff3333",
  color: "white",
  border: "none",
  padding: "10px",
  width: "100%",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "10px",
};