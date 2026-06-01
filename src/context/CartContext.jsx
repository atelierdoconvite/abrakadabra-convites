import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [carrinho, setCarrinho] = useState([]);

  function adicionarCarrinho(produto) {
    setCarrinho((prev) => [...prev, produto]);
  }

  function removerCarrinho(index) {
    const novo = [...carrinho];
    novo.splice(index, 1);
    setCarrinho(novo);
  }

  const total = carrinho.reduce(
    (acc, item) => acc + Number(item.preco || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarCarrinho,
        removerCarrinho,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}