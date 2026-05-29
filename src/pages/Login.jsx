import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function fazerLogin(e) {

    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      alert("Email ou senha inválidos");
      return;
    }

    navigate("/admin");

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={fazerLogin}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
      >

        <h1 className="text-4xl font-bold mb-8 text-center text-pink-500">
          Login Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border p-4 rounded-xl mb-6"
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl font-bold"
        >
          Entrar
        </button>

      </form>

    </div>
  );
}