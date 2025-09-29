// EventsDemo.js
import React, { useState } from "react";

function EventsDemo() {
  const [text, setText] = useState("");

  const handleButtonClick = () => {
    alert("Button was clicked!");
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleHover = () => {
    console.log("Mouse entered the div!");
  };

  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid gray", margin: "10px" }}>
      <h2>React Events Demo</h2>

      {/* Click Event */}
      <button onClick={handleButtonClick}>Click Me</button>

      {/* Input Change + Keyboard Events */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type something..."
        />
        <p>You typed: {text}</p>
      </div>

      {/* Mouse Enter Event */}
      <div
        onMouseEnter={handleHover}
        style={{
          padding: "10px",
          backgroundColor: "#eee",
          marginTop: "10px",
        }}
      >
        Hover over me
      </div>
    </div>
  );
}

export default EventsDemo;
