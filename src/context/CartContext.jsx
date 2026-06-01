import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarCarrinho(produto) {
    setCarrinho((prev) => [...prev, produto]);
  }

  return (
    <CartContext.Provider value={{ carrinho, adicionarCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}