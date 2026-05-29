import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Dashboard() {
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [ultimos, setUltimos] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    // total de produtos
    const { count } = await supabase
      .from("produtos")
      .select("*", { count: "exact", head: true });

    setTotalProdutos(count || 0);

    // últimos produtos
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setUltimos(data || []);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard SaaS 👑</h1>
      <p style={styles.subtitle}>
        Visão geral do seu sistema de convites
      </p>

      {/* CARDS */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total de Produtos</h3>
          <h1>{totalProdutos}</h1>
          <span style={styles.badge}>+ ativos</span>
        </div>

        <div style={styles.card}>
          <h3>Pedidos</h3>
          <h1>0</h1>
          <span style={styles.badgeGray}>em breve</span>
        </div>

        <div style={styles.card}>
          <h3>Usuários</h3>
          <h1>1</h1>
          <span style={styles.badgeGray}>admin</span>
        </div>
      </div>

      {/* ATALHOS */}
      <div style={styles.actions}>
        <button style={styles.button}>➕ Novo Produto</button>
        <button style={styles.button2}>🛍 Ver Catálogo</button>
        <button style={styles.button3}>🎨 Editor</button>
      </div>

      {/* ÚLTIMOS PRODUTOS */}
      <div style={styles.section}>
        <h2>Últimos Produtos</h2>

        <div style={styles.list}>
          {ultimos.map((item) => (
            <div key={item.id} style={styles.item}>
              <div style={styles.dot}></div>
              <span>{item.titulo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    background: "#f7f7fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  title: {
    fontSize: 32,
    marginBottom: 5,
  },

  subtitle: {
    color: "#666",
    marginBottom: 30,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 15,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  badge: {
    background: "#d1fae5",
    color: "#059669",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  badgeGray: {
    background: "#eee",
    color: "#666",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  actions: {
    marginTop: 30,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  button: {
    padding: 10,
    background: "#ff4da6",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },

  button2: {
    padding: 10,
    background: "#4da6ff",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },

  button3: {
    padding: 10,
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },

  section: {
    marginTop: 40,
  },

  list: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  item: {
    background: "#fff",
    padding: 12,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxShadow: "0 5px 15px rgba(0,0,0,0.03)",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#ff4da6",
  },
};