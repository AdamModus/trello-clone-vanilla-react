import React from "react";
import { useTrelloContext } from "../context/TrelloContextManagement";
import Card from "./Card";

const cardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const columnStyle = {
  backgroundColor: "#ebecf0",
  borderRadius: "3px",
  maxWidth: "200px",
  padding: "10px",
};

function Column({ id, name, cards, phantomColumn }) {
  const { addColumn } = useTrelloContext();
  const [newColumnName, setNewColumnName] = React.useState("");

  const handleAddColumn = () => {
    addColumn(newColumnName);
    setNewColumnName("");
  };

  if (phantomColumn) {
    return (
      <div style={columnStyle}>
        <h3>
          <input
            type="text"
            placeholder="New column name"
            onChange={(e) => setNewColumnName(e.target.value)}
            value={newColumnName}
          />
        </h3>
        <button onClick={handleAddColumn}>Add column</button>
      </div>
    );
  }

  return (
    <div style={columnStyle}>
      <h3> {name} </h3>

      <div style={cardContainerStyle}>
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              columnId={id}
              title={card.title}
              content={card.content}
            />
          );
        })}
        <Card columnId={id} phantomCard />
      </div>
    </div>
  );
}

export default Column;
