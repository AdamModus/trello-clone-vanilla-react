import React from "react";
import { useTrelloContext } from "../context/TrelloContextManagement";

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "3px",
  boxShadow: "0 1px 0 #091e4240",
  cursor: "pointer",
  padding: "10px",
};

const phantomCardStyle = {
  ...cardStyle,
  ...{
    cursor: "unset",
  },
};

const buttonStyle = {
  marginTop: "10px",
};

function Card({ columnId, title, content, phantomCard }) {
  const { addCard } = useTrelloContext();
  const [newCardTitle, setNewCardTitle] = React.useState("");
  const [newCardContent, setNewCardContent] = React.useState("");

  const handleAddCard = () => {
    addCard(newCardTitle, newCardContent, columnId);
    setNewCardTitle("");
    setNewCardContent("");
  };

  if (phantomCard) {
    return (
      <div style={phantomCardStyle}>
        <h5>
          <input
            type="text"
            placeholder="New card title"
            onChange={(e) => setNewCardTitle(e.target.value)}
            value={newCardTitle}
          />
        </h5>
        <input
          type="text"
          placeholder="New card content"
          onChange={(e) => setNewCardContent(e.target.value)}
          value={newCardContent}
        />
        <button style={buttonStyle} onClick={handleAddCard}>
          Add card
        </button>
      </div>
    );
  }
  return (
    <div style={cardStyle}>
      <h5> {title} </h5>
      <div> {content} </div>
    </div>
  );
}

export default Card;
