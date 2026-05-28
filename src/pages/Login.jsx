import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function fazerLogin() {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      alert("Login inválido");
      return;
    }

    navigate("/admin");

  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "30px",
        background: "white",
        borderRadius: "16px",
      }}
    >

      <h1>Login Admin</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={fazerLogin}
        style={botao}
      >
        Entrar
      </button>

    </div>
  );

}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const botao = {
  width: "100%",
  padding: "14px",
  border: "none",
  background: "#ff4d8d",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
};