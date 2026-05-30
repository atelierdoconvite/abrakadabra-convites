import { Link } from "react-router-dom";

export default function Home() {

  return (

    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">

      <div className="text-center text-white px-6">

        <h1 className="text-6xl font-bold mb-6">
          Abrakadabra Convites
        </h1>

        <p className="text-2xl mb-8">
          Convites digitais incríveis para festas especiais
        </p>

        <Link
          to="/catalogo"
          className="bg-white text-pink-500 px-8 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition"
        >
          Ver Catálogo
        </Link>

      </div>

    </div>

  );

}
