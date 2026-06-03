import { useEffect, useState, useContext } from "react";
import { supabase } from "../services/supabase";
import { CartContext } from "../context/CartContext";
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
      console.log("Erro Supabase:", error);
      return;
    }

    setProdutos(data || []);
  }

  const produtosFiltrados = produtos.filter((produto) => {
    const matchBusca =
      produto.titulo
        ?.toLowerCase()
        .includes(busca.toLowerCase());

    const matchCategoria =
      categoria === "Todos" ||
      produto.categoria === categoria;

    return matchBusca && matchCategoria;
  });

  return (
    <div>
     <header className="header">
  <div className="logo">
    Abrakadabra Convites
  </div>

  <div>
    🛒 {carrinho.length}
  </div>
</header>

      <div className="categorias">
        {categorias.map((item) => (
          <button
            key={item}
            className="categoria-btn"
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="catalogo-titulo">
        <h2>Escolha seu Convite</h2>
      </div>

      <div className="busca">
        <input
          type="text"
          placeholder="Pesquisar tema..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />
      </div>

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

      <h3 className="produto-titulo">
        {produto.titulo}
      </h3>

      <p className="produto-descricao">
        {produto.descricao}
      </p>

      <p className="produto-preco">
        R$ {produto.preco}
      </p>

      <button
        className="produto-btn"
        onClick={() =>
          adicionarCarrinho(produto)
        }
      >
        Personalizar
      </button>

    </div>

  ))}

</div>
    </div>
  );
}