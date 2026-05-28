import { useParams } from "react-router-dom";
import { produtos } from "../data/produtos";

export default function Produto() {
  const { id } = useParams();

  const produto = produtos.find((p) => p.id === Number(id));

  if (!produto) {
    return <h1>Produto não encontrado ❌</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <img
        src={produto.imagem}
        className="w-full rounded-2xl mb-6"
      />

      <h1 className="text-4xl font-bold text-gray-800">
        {produto.titulo}
      </h1>

      <p className="text-gray-500 mt-2">
        {produto.descricao}
      </p>

      <p className="text-pink-500 text-2xl font-bold mt-4">
        R$ {produto.preco}
      </p>

      <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full">
        Personalizar convite
      </button>
    </div>
  );
}