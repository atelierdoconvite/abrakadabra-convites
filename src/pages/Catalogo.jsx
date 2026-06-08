import { useEffect, useState, useContext } from "react";
import { supabase } from "../services/supabase";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/Catalogo.css";

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const { carrinho } = useContext(CartContext);

  const categorias = [
    "Todos",
    "Infantil",
    "Casamento",
    "15 Anos",
    "Chá Revelação",
    "Formatura",
    "Batizado",
  ];

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("Erro:", error);
      return;
    }

    setProdutos(data || []);
  }

  const produtosFiltrados = produtos.filter((produto) => {
    const matchBusca = produto.titulo
      ?.toLowerCase()
      .includes(busca.toLowerCase());

    return matchBusca;
  });

  return (
    <div className="catalogo-page">
      {/* HEADER */}

      <header className="catalogo-header">
        <div className="logo">
          ✨ Abrakadabra Convites
        </div>

        <div className="carrinho">
          🛒 {carrinho.length}
        </div>
      </header>

      {/* TÍTULO */}

      <section className="catalogo-topo">
        <h1>Escolha seu Convite</h1>

        <p>
          Convites digitais personalizados para todos os momentos especiais.
        </p>
      </section>

      {/* CATEGORIAS */}

      <div className="categorias">
        {categorias.map((item) => (
          <button
            key={item}
            className={`categoria-btn ${
              categoria === item ? "ativo" : ""
            }`}
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* BUSCA */}

      <div className="busca">
        <input
          type="text"
          placeholder="Pesquisar tema..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* PRODUTOS */}

      <div className="catalogo-grid">
        {produtosFiltrados.map((produto) => (
          <div
            key={produto.id}
            className="produto-card"
          >
            <img
              src={produto.imagem}
              alt={produto.titulo}
              className="produto-imagem"
            />

            <div className="produto-info">
              <span className="produto-tag">
                Convite Digital
              </span>

              <h3>{produto.titulo}</h3>

              <p className="produto-descricao">
                {produto.descricao}
              </p>

              <div className="produto-footer">
                <span className="produto-preco">
                  R$ {produto.preco}
                </span>

                <Link to={`/convite/${produto.id}`}>
                  <button className="produto-btn">
                    Personalizar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}