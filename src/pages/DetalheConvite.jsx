import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function DetalheConvite() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [dataFesta, setDataFesta] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [observacoes, setObservacoes] = useState("");

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

  async function enviarWhatsapp() {
    const { data: pedido, error } = await supabase
      .from("pedidos")
      .insert([
        {
          convite_id: produto.id,
          nome,
          idade,
          data_festa: dataFesta,
          horario,
          local,
          observacoes,
          status: "Novo",
        },
      ])
      .select();

    console.log("PEDIDO:", pedido);
    console.log("ERRO:", error);

    alert("PEDIDO: " + JSON.stringify(pedido));
    alert("ERRO: " + JSON.stringify(error));

    if (error) {
      alert("Erro ao salvar pedido!");
      return;
    }

    const mensagem = `
Olá!

Gostaria de personalizar o convite:

Tema: ${produto.titulo}

Nome: ${nome}
Idade: ${idade}
Data: ${dataFesta}
Horário: ${horario}
Local: ${local}
Observações: ${observacoes}
`;

    const url = `https://wa.me/5513981922078?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
  }

  if (!produto) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <h2>Carregando convite...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fdf8f5",
        minHeight: "100vh",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(400px,1fr))",
          gap: 50,
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={produto.imagem}
            alt={produto.titulo}
            style={{
              width: "100%",
              borderRadius: 30,
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.12)",
            }}
          />
        </div>

        <div>
          <span
            style={{
              background: "#f3e8ff",
              color: "#9333ea",
              padding: "10px 18px",
              borderRadius: 30,
            }}
          >
            ✨ Convite Digital
          </span>

          <h1
            style={{
              fontSize: 48,
              marginTop: 20,
            }}
          >
            {produto.titulo}
          </h1>

          <p
            style={{
              color: "#666",
              lineHeight: 1.8,
              marginTop: 15,
            }}
          >
            {produto.descricao}
          </p>

          <h2
            style={{
              color: "#a855f7",
              marginTop: 20,
              fontSize: 36,
            }}
          >
            R$ {produto.preco}
          </h2>

          <div
            style={{
              marginTop: 40,
              background: "#fff",
              padding: 30,
              borderRadius: 25,
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h3>✨ Personalizar Convite</h3>

            <input
              placeholder="Nome do aniversariante"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Data da Festa"
              value={dataFesta}
              onChange={(e) => setDataFesta(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Horário"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Observações"
              value={observacoes}
              onChange={(e) =>
                setObservacoes(e.target.value)
              }
              style={{
                ...inputStyle,
                minHeight: 120,
              }}
            />

            <button
              onClick={enviarWhatsapp}
              style={{
                width: "100%",
                marginTop: 20,
                background:
                  "linear-gradient(135deg,#ec4899,#a855f7)",
                color: "#fff",
                border: "none",
                padding: 16,
                borderRadius: 15,
                cursor: "pointer",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              💬 🚀 TESTE VERCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "16px",
};