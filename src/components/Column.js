import React from "react";
import { useTrelloContext } from "../context/TrelloContextManagement";
import Card from "./Card";

const cardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  pointerEvents: "none",
};

const columnStyle = {
  backgroundColor: "#ebecf0",
  borderRadius: "3px",
  maxWidth: "200px",
  padding: "25px",
};

const highlightedColumnStyle = {
  backgroundColor: "#E0f0fb",
};

const deleteStyle = {
  cursor: "pointer",
  float: "right",
};

const nameStyle = {
  pointerEvents: "none",
};

function Column({ id, name, cards, phantomColumn }) {
  const { addColumn, deleteColumn, cardDraggedEnd } = useTrelloContext();
  const [newColumnName, setNewColumnName] = React.useState("");

  const handleAddColumn = () => {
    addColumn(newColumnName);
    setNewColumnName("");
  };

  const handleDeleteColumn = () => {
    deleteColumn(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    if (e.target.classList.contains("column")) {
      e.target.style.backgroundColor = highlightedColumnStyle.backgroundColor;
    }
  };

  const handleDragLeave = (e) => {
    if (e.target.classList.contains("column")) {
      e.target.style.backgroundColor = columnStyle.backgroundColor;
    }
  };

  const handleDrop = (e) => {
    e.target.style.backgroundColor = columnStyle.backgroundColor;
    document.querySelectorAll(".card:not(.dragged-card)").forEach((card) => {
      card.style.pointerEvents = "auto";
      card.style.backgroundColor = "#fff";
    });
    cardDraggedEnd(id);
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
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={columnStyle}
      className="column"
    >
      <h3 onClick={handleDeleteColumn} style={deleteStyle}>
        🗑
      </h3>
      <h3 style={nameStyle}>{name}</h3>

      <div style={cardContainerStyle}>
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              id={index}
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
