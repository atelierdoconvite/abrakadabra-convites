import { useEffect, useState } from "react";

export default function Convites() {
  const [convites, setConvites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("convites")) || [];
    setConvites(data);
  }, []);

  function deletar(id) {
    const novos = convites.filter((c) => c.id !== id);
    setConvites(novos);
    localStorage.setItem("convites", JSON.stringify(novos));
  }

  return (
    <div>
      <h1>Convites</h1>

      {convites.map((c) => (
        <div key={c.id} style={item}>
          <h3>{c.titulo}</h3>
          <button onClick={() => deletar(c.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

const item = {
  padding: 10,
  border: "1px solid #ddd",
  marginBottom: 10,
};