import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Dashboard() {
  const [convitesCount, setConvitesCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from("convites").select("*");

      setConvitesCount(data?.length || 0);
    }

    loadData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Admin 👑</h1>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>Convites</h2>
          <p>{convitesCount}</p>
        </div>

        <div style={styles.card}>
          <h2>Pedidos</h2>
          <p>0</p>
        </div>

        <div style={styles.card}>
          <h2>Usuários</h2>
          <p>1</p>
        </div>
      </div>

      <div style={styles.actions}>
        <button style={styles.button}>Criar Convite</button>
        <button style={styles.buttonSecondary}>Ver Catálogo</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    background: "#f9f9fb",
    minHeight: "100vh",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
  actions: {
    marginTop: 30,
    display: "flex",
    gap: 10,
  },
  button: {
    padding: "10px 15px",
    background: "#ff4da6",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "10px 15px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 8,
    cursor: "pointer",
  },
};