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

  // total
  const total = carrinho.reduce(
    (acc, item) => acc + Number(item.preco),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

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

      {/* HERO */}

      <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold mb-6">
            Convites Digitais Incríveis
          </h2>

          <p className="text-xl mb-8 max-w-2xl">
            Os temas mais encantadores para aniversários,
            festas e momentos especiais.
          </p>

          <button className="bg-white text-pink-500 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
            Comprar Agora
          </button>

        </div>

      </section>

      {/* PRODUTOS */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold mb-10">
          Produtos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {produtos.map((produto) => (

            <div
              key={produto.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
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

      {/* CARRINHO */}

      {abrirCarrinho && (

        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">
              Carrinho
            </h2>

            <button
              onClick={() => setAbrirCarrinho(false)}
              className="text-2xl"
            >
              ✕
            </button>

          </div>

          {carrinho.length === 0 ? (

            <p>Carrinho vazio</p>

          ) : (

            <div className="space-y-4">

              {carrinho.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-4 bg-gray-100 p-4 rounded-xl"
                >

                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">

                    <h3 className="font-bold">
                      {item.titulo}
                    </h3>

                    <p className="text-pink-500 font-bold">
                      R$ {item.preco}
                    </p>

                    <button
                      onClick={() => removerCarrinho(index)}
                      className="text-red-500 mt-2"
                    >
                      Remover
                    </button>

                  </div>

                </div>

              ))}

              <div className="border-t pt-4">

                <h3 className="text-2xl font-bold">
                  Total: R$ {total}
                </h3>

                <button
  onClick={() => {

    const mensagem = carrinho
      .map(
        (item) =>
          `• ${item.titulo} - R$ ${item.preco}`
      )
      .join("%0A");

    const url = `https://wa.me/5513981922078?text=Olá,%20quero%20comprar:%0A%0A${mensagem}%0A%0ATotal:%20R$%20${total}`;

    window.open(url, "_blank");

  }}
  className="w-full bg-pink-500 text-white py-4 rounded-xl mt-4 hover:bg-pink-600"
>
  Finalizar Compra
</button>

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  );

}