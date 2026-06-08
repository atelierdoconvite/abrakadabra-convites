import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    carregarPedidos();
  }, []);
async function enviarWhatsapp() {
  const { data, error } = await supabase
    .from("pedidos")
    .insert([
      {
        convite_id: produto.id,
        nome,
        idade,
        data_festa: data,
        horario,
        local,
        observacoes,
        status: "Novo",
      },
    ])
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Pedido salvo com sucesso!");
}
  async function carregarPedidos() {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setPedidos(data || []);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>📋 Pedidos Recebidos</h1>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Idade</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.nome}</td>
              <td>{pedido.idade}</td>
              <td>{pedido.data_festa}</td>
              <td>{pedido.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}