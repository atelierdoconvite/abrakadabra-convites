import { useState } from "react";

export default function CriarConvite() {
  const [titulo, setTitulo] = useState("");

  function salvar() {
    const atual = JSON.parse(localStorage.getItem("convites")) || [];

    const novo = {
      id: Date.now(),
      titulo,
    };

    atual.push(novo);
    localStorage.setItem("convites", JSON.stringify(atual));

    setTitulo("");
    alert("Convite criado!");
  }

  return (
    <div>
      <h1>Criar Convite</h1>

      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nome do convite"
      />

      <button onClick={salvar}>Salvar</button>
    </div>
  );
}