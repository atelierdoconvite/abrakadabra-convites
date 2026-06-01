import { useEffect, useState, useContext } from "react";
import { supabase } from "../services/supabase";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Catalogo() {
const {
  carrinho,
  adicionarCarrinho,
  removerCarrinho,
  total
} = useContext(CartContext);

  useEffect(() => {
    carregarProdutos();
  }, []);
function abrirModal(produto) {
  setConviteSelecionado(produto);
  setModalAberto(true);
}

function fecharModal() {
  setModalAberto(false);
  setConviteSelecionado(null);
}
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

  const cardInfo = {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    textAlign: "center",
  };

  return (
    <div
      style={{
        background: "#fdf8f5",
        minHeight: "100vh",
      }}
    >
      {/* NAVBAR */}

      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #eee",
          padding: "16px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#2b1b14",
            }}
          >
            ✨ Abrakadabra Convites
          </h1>
        </div>

        <div
  onClick={() => setCarrinhoAberto(true)}
  style={{
    position: "relative",
    cursor: "pointer"
  }}
>
  <ShoppingCart size={28} />

  <span
    style={{
      position: "absolute",
      top: -8,
      right: -10,
      background: "#a855f7",
      color: "#fff",
      width: 20,
      height: 20,
      borderRadius: "50%",
      fontSize: 11,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    {carrinho.length}
  </span>
</div>
      </header>

      <div style={{ height: 90 }} />

      {/* HERO */}

      <section
        style={{
          textAlign: "center",
          padding: "80px 20px",
          background:
            "linear-gradient(135deg,#fff6fb,#fffaf4)",
        }}
      >
        <h2
          style={{
            fontSize: 48,
            color: "#2b1b14",
            marginBottom: 20,
          }}
        >
          ✨ Convites Digitais Personalizados
        </h2>

        <p
          style={{
            maxWidth: 700,
            margin: "0 auto",
            color: "#6b5d50",
            lineHeight: 1.8,
            fontSize: 18,
          }}
        >
          Transformamos momentos especiais em experiências
          mágicas. Escolha um modelo encantador e receba seu
          convite pronto diretamente no WhatsApp.
        </p>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          <a
            href="#catalogo"
            style={{
              background: "#a855f7",
              color: "#fff",
              padding: "14px 24px",
              borderRadius: 30,
              textDecoration: "none",
            }}
          >
            🎨 Ver Catálogo
          </a>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#25d366",
              color: "#fff",
              padding: "14px 24px",
              borderRadius: 30,
              textDecoration: "none",
            }}
          >
            💬 Fazer Pedido
          </a>
        </div>
      </section>

      {/* COMO FUNCIONA */}

      <section
        style={{
          maxWidth: 1200,
          margin: "60px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 40,
            color: "#2b1b14",
          }}
        >
          ✨ Como a magia acontece
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: 25,
          }}
        >
          <div style={cardInfo}>
            <h3>🎨 Escolha seu tema</h3>
            <p>Escolha o modelo perfeito.</p>
          </div>

          <div style={cardInfo}>
            <h3>✨ Envie seus dados</h3>
            <p>Nome, idade e informações da festa.</p>
          </div>

          <div style={cardInfo}>
            <h3>📱 Receba pronto</h3>
            <p>Entrega rápida pelo WhatsApp.</p>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}

      <section
        style={{
          textAlign: "center",
          marginBottom: 60,
          padding: "0 20px",
        }}
      >
        <h2>🌟 Temas Populares</h2>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {[
            "🎂 Infantil",
            "👑 Princesas",
            "🚀 Astronauta",
            "🦄 Unicórnio",
            "🎮 Minecraft",
            "🦁 Safári",
            "🌸 Jardim Encantado",
          ].map((tema) => (
            <button
              key={tema}
              style={{
                border: "none",
                background: "#fff",
                padding: "12px 18px",
                borderRadius: 30,
                cursor: "pointer",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              {tema}
            </button>
          ))}
        </div>
      </section>

      {/* CATÁLOGO */}

      <section
        id="catalogo"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px 100px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 40,
            color: "#2b1b14",
          }}
        >
          ✨ Catálogo Encantado
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: 30,
          }}
        >
          {produtos.map((produto) => (
            <div
              key={produto.id}
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  background: "#fafafa",
                  padding: 15,
                }}
              >
                <img
                  src={produto.imagem}
                  alt={produto.titulo}
                  style={{
                    width: "100%",
                    maxHeight: 650,
                    objectFit: "contain",
                  }}
                />
              </div>

              <div style={{ padding: 20 }}>
                <h3>{produto.titulo}</h3>

                <p
                  style={{
                    color: "#777",
                  }}
                >
                  {produto.descricao}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 10,
                    fontSize: 13,
                  }}
                >
                  <span>✨ Personalizado</span>
                  <span>📱 Digital</span>
                  <span>⚡ Entrega rápida</span>
                </div>

                <h3
                  style={{
                    color: "#a855f7",
                    marginTop: 15,
                  }}
                >
                  R$ {produto.preco}
                </h3>
<button
  onClick={() => abrirModal(produto)}
  style={{
    width: "100%",
    padding: 14,
    borderRadius: 30,
    border: "2px solid #a855f7",
    background: "#fff",
    color: "#a855f7",
    cursor: "pointer",
    marginTop: 15
  }}
>
  👁️ Visualizar
</button>
                <button
                  onClick={() => {
                    adicionarCarrinho(produto);

                    alert(
                      `${produto.titulo} adicionado ao carrinho ✨`
                    );
                  }}
                  style={{
                    width: "100%",
                    border: "none",
                    padding: 14,
                    borderRadius: 30,
                    cursor: "pointer",
                    color: "#fff",
                    marginTop: 15,
                    background:
                      "linear-gradient(135deg,#ec4899,#a855f7)",
                  }}
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTÃO WHATSAPP */}

      <a
        href="https://wa.me/5513981922078"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed",
          right: 25,
          bottom: 25,
          background: "#25d366",
          color: "#fff",
          textDecoration: "none",
          padding: "16px 22px",
          borderRadius: 50,
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.2)",
          zIndex: 9999,
        }}
      >
        💬 Fazer Pedido
      </a>
      {modalAberto && conviteSelecionado && (

  <div
    onClick={fecharModal}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000,
      padding: 20
    }}
  >

    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "#fff",
        borderRadius: 20,
        maxWidth: 900,
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: 20,
        position: "relative"
      }}
    >

      {/* FECHAR */}

      <button
        onClick={fecharModal}
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          border: "none",
          background: "#eee",
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: 18
        }}
      >
        ✕
      </button>

      {/* IMAGEM */}

      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <img
          src={conviteSelecionado.imagem}
          alt={conviteSelecionado.titulo}
          style={{
            width: "100%",
            maxHeight: "70vh",
            objectFit: "contain",
            borderRadius: 15
          }}
        />
      </div>

      {/* INFO */}

      <div style={{ marginTop: 20 }}>

        <h2
          style={{
            color: "#2b1b14"
          }}
        >
          {conviteSelecionado.titulo}
        </h2>

        <p
          style={{
            color: "#666",
            marginTop: 10
          }}
        >
          {conviteSelecionado.descricao}
        </p>

        <h3
          style={{
            color: "#a855f7",
            marginTop: 20
          }}
        >
          R$ {conviteSelecionado.preco}
        </h3>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 20,
            flexWrap: "wrap"
          }}
        >

          <button
            onClick={() => {
              adicionarCarrinho(conviteSelecionado);

              alert(
                `${conviteSelecionado.titulo} adicionado ao carrinho ✨`
              );
            }}
            style={{
              flex: 1,
              border: "none",
              background:
                "linear-gradient(135deg,#ec4899,#a855f7)",
              color: "#fff",
              padding: 14,
              borderRadius: 30,
              cursor: "pointer"
            }}
          >
            🛒 Comprar
          </button>

          <a
            href="https://wa.me/5513981922078"
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              background: "#25d366",
              color: "#fff",
              padding: 14,
              borderRadius: 30,
              textDecoration: "none"
            }}
          >
            💬 WhatsApp
          </a>

        </div>

      </div>

    </div>

  </div>

)}
{carrinhoAberto && (

<div
  style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.5)",
    zIndex: 9999
  }}
  onClick={() => setCarrinhoAberto(false)}
>

  <div
    onClick={(e) => e.stopPropagation()}
    style={{
      position: "absolute",
      right: 0,
      top: 0,
      width: 400,
      maxWidth: "100%",
      height: "100%",
      background: "#fff",
      padding: 20,
      overflowY: "auto"
    }}
  >

    <h2>🛒 Meu Carrinho</h2>

    {carrinho.length === 0 ? (

      <p>Seu carrinho está vazio.</p>

    ) : (

      <>
        {carrinho.map((item, index) => (

          <div
            key={index}
            style={{
              borderBottom: "1px solid #eee",
              padding: "12px 0"
            }}
          >
            <strong>{item.titulo}</strong>

            <p>R$ {item.preco}</p>

            <button
              onClick={() =>
                removerCarrinho(index)
              }
              style={{
                border: "none",
                background: "red",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 20
              }}
            >
              Remover
            </button>
          </div>

        ))}

        <h3
          style={{
            marginTop: 20
          }}
        >
          Total: R$ {total.toFixed(2)}
        </h3>

      </>
    )}

  </div>

</div>

)}
<a
  href={`https://wa.me/5511999999999?text=${encodeURIComponent(
`Olá! Gostaria de encomendar:

${carrinho
  .map(
    (item) =>
      `• ${item.titulo} - R$ ${item.preco}`
  )
  .join("\n")}

Total: R$ ${total.toFixed(2)}
`
  )}`}
  target="_blank"
  rel="noreferrer"
  style={{
    display: "block",
    marginTop: 20,
    background: "#25d366",
    color: "#fff",
    textAlign: "center",
    padding: 14,
    borderRadius: 30,
    textDecoration: "none"
  }}
>
  💬 Finalizar Pedido
</a>
    </div>
  );
}