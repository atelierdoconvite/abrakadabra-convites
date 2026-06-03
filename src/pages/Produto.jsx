import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Produto() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);

  useEffect(() => {
    carregarProduto();
  }, []);

  async function carregarProduto() {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setProduto(data);
  }

  if (!produto) {
    return (
      <div style={{ padding: 40 }}>
        Carregando...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "50px auto",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >
        {/* IMAGEM */}
        <div>
          <img
            src={produto.imagem}
            alt={produto.titulo}
            style={{
              width: "100%",
              borderRadius: 20,
            }}
          />
        </div>

        {/* INFORMAÇÕES */}
        <div>
          <h1>{produto.titulo}</h1>

          <p
            style={{
              marginTop: 20,
              color: "#666",
            }}
          >
            {produto.descricao}
          </p>

          <h2
            style={{
              marginTop: 20,
            }}
          >
            R$ {produto.preco}
          </h2>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              gap: 10,
            }}
          >
            <button
              style={{
                background: "#2b1b14",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Comprar
            </button>

            <button
              style={{
                background: "#f6f1ea",
                border: "1px solid #ddd",
                padding: "12px 24px",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Personalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}