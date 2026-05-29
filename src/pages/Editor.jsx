import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import Draggable from "react-draggable";

export default function Editor() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [designId, setDesignId] = useState(null);

  const [textos, setTextos] = useState([
    { id: 1, text: "Seu convite aqui ✨", x: 50, y: 50 }
  ]);

  const canvasRef = useRef();

  useEffect(() => {
    loadProduto();
    loadDesign();
  }, []);

  // 📦 carregar produto
  async function loadProduto() {
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .eq("id", id)
      .single();

    setProduto(data);
  }

  // 💾 carregar design salvo
  async function loadDesign() {
    const { data } = await supabase
      .from("designs")
      .select("*")
      .eq("produto_id", id)
      .single();

    if (data) {
      setTextos(data.textos);
      setDesignId(data.id);
    }
  }

  // 🔄 atualizar posição
  function updatePosition(index, data) {
    const newTextos = [...textos];
    newTextos[index].x = data.x;
    newTextos[index].y = data.y;
    setTextos(newTextos);
  }

  // 💾 salvar design
  async function saveDesign() {
    if (designId) {
      // atualizar
      await supabase
        .from("designs")
        .update({
          textos
        })
        .eq("id", designId);
    } else {
      // criar novo
      const { data } = await supabase
        .from("designs")
        .insert([
          {
            produto_id: id,
            textos
          }
        ])
        .select()
        .single();

      setDesignId(data.id);
    }

    alert("Design salvo com sucesso! 💾");
  }

  if (!produto) {
    return <h2>Carregando editor...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>Editor Canva ✨</h1>

      {/* CANVAS */}
      <div ref={canvasRef} style={styles.canvas}>
        <img src={produto.imagem} style={styles.background} />

        {textos.map((item, index) => (
          <Draggable
            key={item.id}
            defaultPosition={{ x: item.x, y: item.y }}
            onStop={(e, data) => updatePosition(index, data)}
          >
            <div style={styles.text}>
              {item.text}
            </div>
          </Draggable>
        ))}
      </div>

      {/* BOTÕES */}
      <button onClick={saveDesign} style={styles.button}>
        Salvar Design 💾
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    textAlign: "center",
  },

  canvas: {
    width: 400,
    height: 600,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  background: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
  },

  text: {
    position: "absolute",
    padding: 10,
    background: "rgba(255,255,255,0.8)",
    borderRadius: 8,
    cursor: "move",
    fontWeight: "bold",
  },

  button: {
    marginTop: 20,
    padding: 12,
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};