import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [carrinho, setCarrinho] = useState([]);

  function adicionarCarrinho(produto) {

    setCarrinho((prev) => [...prev, produto]);

  }

  function removerCarrinho(index) {

    const novoCarrinho = [...carrinho];

    novoCarrinho.splice(index, 1);

    setCarrinho(novoCarrinho);

  }

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarCarrinho,
        removerCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );

}