import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function DetalheConvite() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");

  useEffect(() => {
    carregarProduto();
  }, []);

  async function carregarProduto() {
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .eq("id", id)
      .single();

    setProduto(data);
  }

  function enviarWhatsapp() {
    const mensagem = `
Olá!

Gostaria de personalizar o convite:

Tema: ${produto.titulo}

Nome: ${nome}
Idade: ${idade}
Data: ${data}
Horário: ${horario}
Local: ${local}
`;

    const url =
      `https://wa.me/5513981922078?text=${encodeURIComponent(
        mensagem
      )}`;

    window.open(url, "_blank");
  }

  if (!produto) {
    return <h2>Carregando...</h2>;
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
        <img
          src={produto.imagem}
          alt={produto.titulo}
          style={{
            width: "100%",
            borderRadius: 20,
          }}
        />

        <div>
          <h1>{produto.titulo}</h1>

          <p>{produto.descricao}</p>

          <h2
            style={{
              color: "#8b6b4a",
            }}
          >
            R$ {produto.preco}
          </h2>

          <h3>Personalização</h3>

          <input
            placeholder="Nome do aniversariante"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

          <br /><br />

          <input
            placeholder="Idade"
            value={idade}
            onChange={(e) =>
              setIdade(e.target.value)
            }
          />

          <br /><br />

          <input
            placeholder="Data"
            value={data}
            onChange={(e) =>
              setData(e.target.value)
            }
          />

          <br /><br />

          <input
            placeholder="Horário"
            value={horario}
            onChange={(e) =>
              setHorario(e.target.value)
            }
          />

          <br /><br />

          <input
            placeholder="Local"
            value={local}
            onChange={(e) =>
              setLocal(e.target.value)
            }
          />

          <br /><br />

          <button
            onClick={enviarWhatsapp}
          >
            Enviar Pedido pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}