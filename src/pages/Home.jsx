import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
export default function Home(export default function Home() {) {
  const temas = [
    "🎮 Minecraft",
    "👑 Princesas",
    "🦄 Unicórnio",
    "🚀 Astronauta",
    "🦁 Safári",
    "🌸 Jardim Encantado",
  ];
const [destaques, setDestaques] = useState([]);

useEffect(() => {
  carregarDestaques();
}, []);

async function carregarDestaques() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("id", { ascending: false })
    .limit(6);

  if (error) {
    console.log(error);
    return;
  }

  setDestaques(data || []);
}
  return (
    <div
      style={{
        background: "#fdf8f5",
        minHeight: "100vh",
        color: "#2b1b14",
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
        <h1
          style={{
            margin: 0,
            fontSize: 24,
          }}
        >
          ✨ Abrakadabra Convites
        </h1>

        <nav
          style={{
            display: "flex",
            gap: 25,
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            Home
          </a>

          <a
            href="/catalogo"
            style={{ textDecoration: "none" }}
          >
            Catálogo
          </a>

          <a
            href="/login"
            style={{ textDecoration: "none" }}
          >
            Admin
          </a>
        </nav>
      </header>

      <div style={{ height: 90 }} />

      {/* HERO */}

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 20px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: 40,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              background: "#f3e8ff",
              color: "#9333ea",
              padding: "10px 18px",
              borderRadius: 30,
            }}
          >
            ✨ Convites Digitais Personalizados
          </span>

          <h2
            style={{
              fontSize: 58,
              lineHeight: 1.1,
              marginTop: 25,
            }}
          >
            Transformamos momentos especiais em magia
          </h2>

          <p
            style={{
              fontSize: 18,
              color: "#6b5d50",
              lineHeight: 1.8,
              marginTop: 20,
            }}
          >
            Convites digitais criativos e personalizados
            para aniversários, chás revelação,
            casamentos e eventos inesquecíveis.
          </p>

          <div
            style={{
              display: "flex",
              gap: 15,
              flexWrap: "wrap",
              marginTop: 30,
            }}
          >
            <a
              href="/catalogo"
              style={{
                background:
                  "linear-gradient(135deg,#ec4899,#a855f7)",
                color: "#fff",
                textDecoration: "none",
                padding: "15px 28px",
                borderRadius: 30,
              }}
            >
              🎨 Ver Catálogo
            </a>

            <a
              href="https://wa.me/5513981922078"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#25d366",
                color: "#fff",
                textDecoration: "none",
                padding: "15px 28px",
                borderRadius: 30,
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1513151233558-d860c5398176"
            alt="Festa"
            style={{
              width: "100%",
              borderRadius: 30,
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      </section>

      {/* ESTATÍSTICAS */}

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
          }}
        >
          {[
            ["1000+", "Convites Entregues"],
            ["500+", "Clientes Felizes"],
            ["5⭐", "Avaliação Média"],
            ["24h", "Entrega Rápida"],
          ].map((item) => (
            <div
              key={item[0]}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 30,
                textAlign: "center",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  color: "#a855f7",
                  fontSize: 40,
                }}
              >
                {item[0]}
              </h3>

              <p>{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMAS */}

      <section
        style={{
          padding: "0 20px 80px",
          textAlign: "center",
        }}
      >
        <h2>🌟 Temas Mais Procurados</h2>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            flexWrap: "wrap",
            gap: 15,
            justifyContent: "center",
          }}
        >
          {temas.map((tema) => (
            <div
              key={tema}
              style={{
                background: "#fff",
                padding: "15px 25px",
                borderRadius: 30,
                boxShadow:
                  "0 6px 15px rgba(0,0,0,0.08)",
              }}
            >
              {tema}
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}

      <section
        style={{
          background: "#fff",
          padding: "80px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          ✨ Como Funciona
        </h2>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: 25,
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h3>🎨 Escolha</h3>
            <p>Escolha seu convite favorito.</p>
          </div>

          <div
            style={{
              textAlign: "center",
            }}
          >
            <h3>✨ Personalize</h3>
            <p>Envie os dados da festa.</p>
          </div>

          <div
            style={{
              textAlign: "center",
            }}
          >
            <h3>📱 Receba</h3>
            <p>Pronto pelo WhatsApp.</p>
          </div>
        </div>
      </section>
<section
  style={{
    maxWidth: 1200,
    margin: "0 auto",
    padding: "80px 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: 40,
    }}
  >
    ✨ Convites em Destaque
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: 25,
    }}
  >
    {destaques.map((produto) => (
      <div
        key={produto.id}
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={produto.imagem}
          alt={produto.titulo}
          style={{
            width: "100%",
            height: 350,
            objectFit: "cover",
          }}
        />

        <div style={{ padding: 20 }}>
          <h3>{produto.titulo}</h3>

          <p
            style={{
              color: "#777",
              fontSize: 14,
            }}
          >
            {produto.descricao}
          </p>

          <h4
            style={{
              color: "#a855f7",
              marginTop: 10,
            }}
          >
            R$ {produto.preco}
          </h4>
        </div>
      </div>
    ))}
  </div>

  <div
    style={{
      textAlign: "center",
      marginTop: 40,
    }}
  >
    <a
      href="/catalogo"
      style={{
        background:
          "linear-gradient(135deg,#ec4899,#a855f7)",
        color: "#fff",
        textDecoration: "none",
        padding: "14px 30px",
        borderRadius: 30,
      }}
    >
      Ver Todos os Convites
    </a>
  </div>
</section>
      {/* CTA FINAL */}

      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          background:
            "linear-gradient(135deg,#ec4899,#a855f7)",
          color: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: 50,
          }}
        >
          ✨ Pronta para criar algo mágico?
        </h2>

        <p
          style={{
            marginTop: 20,
            fontSize: 18,
          }}
        >
          Seu convite personalizado está a poucos cliques.
        </p>

        <a
          href="/catalogo"
          style={{
            display: "inline-block",
            marginTop: 30,
            background: "#fff",
            color: "#9333ea",
            padding: "16px 30px",
            borderRadius: 30,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Ver Catálogo
        </a>
      </section>
    </div>
  );
}