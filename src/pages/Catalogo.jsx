import { useEffect, useState, useContext } from "react";
import { supabase } from "../services/supabase";
import { CartContext } from "../context/CartContext";

export default function Catalogo() {

  const [produtos, setProdutos] = useState([]);

  const {
    carrinho,
    adicionarCarrinho,
    removerCarrinho,
  } = useContext(CartContext);

  const [abrirCarrinho, setAbrirCarrinho] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {

    const { data, error } = await supabase
      .from("produtos")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setProdutos(data);

  }

  const total = carrinho.reduce(
    (acc, item) => acc + Number(item.preco),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-pink-500">
            Abrakadabra
          </h1>

          <div className="flex items-center gap-6">

            <a href="/" className="hover:text-pink-500">
              Home
            </a>

            <a href="/catalogo" className="hover:text-pink-500">
              Catálogo
            </a>

            <button
              onClick={() => setAbrirCarrinho(true)}
              className="relative bg-pink-500 text-white px-4 py-2 rounded-xl"
            >
              Carrinho

              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                {carrinho.length}
              </span>

            </button>

          </div>

        </div>

      </header>

      <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold mb-6">
            Convites Digitais Incríveis
          </h2>

          <p className="text-xl mb-8 max-w-2xl">
            Os temas mais encantadores para aniversários,
            festas e momentos especiais.
          </p>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold mb-10">
          Produtos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {produtos.map((produto) => (

            <div
              key={produto.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition"
            >

              <img
                src={produto.imagem}
                alt={produto.titulo}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold mb-2">
                  {produto.titulo}
                </h3>

                <p className="text-gray-600 mb-4">
                  {produto.descricao}
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-2xl font-bold text-pink-500">
                    R$ {produto.preco}
                  </span>

                  <button
                    onClick={() => adicionarCarrinho(produto)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-xl"
                  >
                    Comprar
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}