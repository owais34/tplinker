import { useState } from "react";

const Button = ({ text, style, onClick }) => {
  const [clickedColor, setClickedColor] = useState({
    bg: "var(--theme3)",
    cl: "var(--theme2)",
  });

  const clickHandler = (e) => {
    if (onClick) onClick(e);
    setClickedColor({ bg: "var(--theme4)", cl: "var(--theme2)" });
    setTimeout(()=>{setClickedColor({
      bg: "var(--theme3)",
      cl: "var(--theme2)"
    })},100)
  };


  if (style)
    return (
      <button
        style={{ ...style, borderRadius: "10%" }}
        onClick={clickHandler}
      >
        {text}
      </button>
    );
  else
    return (
      <button
        style={{
          backgroundColor: clickedColor.bg,
          color: clickedColor.cl,
          padding: "10px",
          maxWidth: "600px",
          minWidth: "min(400px,100vw)",
          fontSize: "20px",
          fontWeight: "bold",
          margin: "10px",
          border: "1px var(--theme4)",
        }}
        onClick={clickHandler}
      >
        {text}
      </button>
    );
};

export default Button;
