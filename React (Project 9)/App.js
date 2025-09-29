// App.js
import React from "react";
import Header from "./Header";
import Button from "./Button";
import EventsDemo from "./EventsDemo";
import FormsDemo from "./FormsDemo";

function App() {
  return (
    <div>
      <Header />
      <h1>React Experiments: Core Concepts + Events + Forms</h1>

      {/* Experiment 1: Buttons (Core Concepts - Props + State) */}
      <Button text="Login" color="blue" />
      <Button text="Logout" color="red" />
      <Button text="Cancel" />

      {/* Experiment 2: Events */}
      <EventsDemo />

      {/* Experiment 3: Forms */}
      <FormsDemo />
    </div>
  );
}

export default App;
