// Button.js
import React, { useState } from "react";

function Button({ text, color }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px",
        margin: "5px",
        backgroundColor: color || "lightblue",
        border: "none",
        borderRadius: "4px",
      }}
    >
      {text} - Clicked {count} times
    </button>
  );
}

export default Button;
