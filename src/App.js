import React from "react";
import Columns from "./components/Columns";
import { TrelloContextProvider } from "./context/TrelloContextManagement";

const headerStyle = {
  textAlign: "center",
};

function App() {
  return (
    <div>
      <h1 style={headerStyle}>This is my react app!</h1>
      <TrelloContextProvider>
        <Columns />
      </TrelloContextProvider>
    </div>
  );
}

export default App;
