import { createContext, useState } from "react";
import convite1 from "../assets/images/convite1.png";
import convite2 from "../assets/images/convite2.png";
import convite3 from "../assets/images/convite3.png";

export const ProdutosContext = createContext();

export function ProdutosProvider({ children }) {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      titulo: "Jardim das Fadas",
      descricao: "Convite delicado e mágico",
      imagem: convite1,
      preco: 29.9
    },
    {
      id: 2,
      titulo: "Safari Encantado",
      descricao: "Tema safari moderno",
      imagem: convite2,
      preco: 34.9
    },
    {
      id: 3,
      titulo: "Universo Estelar",
      descricao: "Convite espacial premium",
      imagem: convite3,
      preco: 39.9
    }
  ]);

  function adicionarProduto(produto) {
    setProdutos([...produtos, { ...produto, id: Date.now() }]);
  }

  function removerProduto(id) {
    setProdutos(produtos.filter((p) => p.id !== id));
  }

  return (
    <ProdutosContext.Provider value={{ produtos, adicionarProduto, removerProduto }}>
      {children}
    </ProdutosContext.Provider>
  );
}