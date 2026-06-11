<h1>VERSÃO TESTE 08/06</h1>
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
export default function Home() {
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
  const temas = [
    "🎮 Minecraft",
    "👑 Princesas",
    "🦄 Unicórnio",
    "🚀 Astronauta",
    "🦁 Safári",
    "🌸 Jardim Encantado",
  ];

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
          <h1>VERSÃO TESTE 08/06</h1>
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
{/* HERO */}

<section
  style={{
    maxWidth: 1200,
    margin: "0 auto",
    padding: "80px 20px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(350px,1fr))",
    gap: 60,
    alignItems: "center",
  }}
>
  {/* TEXTO */}

  <div>
    <span
      style={{
        background: "#efe7dd",
        color: "#8b6b4a",
        padding: "10px 18px",
        borderRadius: 30,
        fontWeight: "bold",
      }}
    >
      ✨ Convites Digitais Premium
    </span>

    <h2
      style={{
        fontSize: 58,
        lineHeight: 1.1,
        marginTop: 25,
        color: "#3d2c1f",
      }}
    >
      Convites que transformam
      <br />
      momentos em memórias
    </h2>

    <p
      style={{
        fontSize: 18,
        color: "#6b5d50",
        lineHeight: 1.8,
        marginTop: 20,
      }}
    >
      Convites digitais personalizados
      para aniversários, casamentos,
      chá revelação, formaturas e
      momentos inesquecíveis.
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
          background: "#8b6b4a",
          color: "#fff",
          textDecoration: "none",
          padding: "15px 28px",
          borderRadius: 12,
          fontWeight: "bold",
        }}
      >
        Ver Catálogo
      </a>

      <a
        href="https://wa.me/5513981922078"
        target="_blank"
        rel="noreferrer"
        style={{
          border: "2px solid #8b6b4a",
          color: "#8b6b4a",
          textDecoration: "none",
          padding: "15px 28px",
          borderRadius: 12,
          fontWeight: "bold",
        }}
      >
        WhatsApp
      </a>
    </div>
  </div>

  {/* CONVITE PREMIUM */}

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    {/* CÍRCULO DECORATIVO */}

    <div
      style={{
        position: "absolute",
        width: 450,
        height: 450,
        borderRadius: "50%",
        background:
          "linear-gradient(135deg,#f5e6d3,#e9d5c0)",
        filter: "blur(40px)",
        opacity: 0.8,
      }}
    />

    {/* CARTÃO DE FUNDO */}

    <div
      style={{
        position: "absolute",
        width: 350,
        height: 500,
        background: "#f3ede6",
        borderRadius: 30,
        transform: "rotate(6deg)",
        zIndex: 1,
      }}
    />

    {/* CONVITE */}

    <div
      style={{
        background: "#fff",
        padding: 15,
        borderRadius: 30,
        boxShadow:
          "0 30px 60px rgba(0,0,0,0.15)",
        position: "relative",
        zIndex: 2,
        transform: "rotate(-2deg)",
      }}
    >
      <img
        src="/images/Convite de casamento.png"
        alt="Convite Premium"
        style={{
          width: 350,
          borderRadius: 20,
          display: "block",
        }}
      />
    </div>
  </div>
</section>
    </div>
  );
}