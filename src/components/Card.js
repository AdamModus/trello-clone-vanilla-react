import React from "react";
import { useTrelloContext } from "../context/TrelloContextManagement";

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "3px",
  boxShadow: "0 1px 0 #091e4240",
  cursor: "move",
  padding: "10px",
  pointerEvents: "auto",
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

const iconsWrapperStyle = {
  float: "right",
};

const iconStyle = {
  cursor: "pointer",
};

const deleteIconStyle = {
  ...iconStyle,
  ...{
    marginLeft: "10px",
  },
};

function Card({ id, columnId, title = "", content = "", phantomCard = false }) {
  const { addCard, deleteCard, editCard, cardDraggedStart } =
    useTrelloContext();
  const [newCardTitle, setNewCardTitle] = React.useState(title);
  const [newCardContent, setNewCardContent] = React.useState(content);
  const [editMode, setEditMode] = React.useState(phantomCard);

  const handleAddCard = () => {
    if (newCardTitle.trim() === "" || newCardContent.trim() === "") {
      return;
    }
    addCard(newCardTitle, newCardContent, columnId);
    setNewCardTitle("");
    setNewCardContent("");
  };

  const handleDeleteCard = () => {
    deleteCard(columnId, id);
  };

  const handleEditCard = () => {
    if (newCardTitle.trim() === "" || newCardContent.trim() === "") {
      return;
    }
    editCard(newCardTitle, newCardContent, columnId, id);
    setEditMode(false);
  };

  const handleSetEditMode = () => {
    setEditMode(true);
  };

  const handleDragStart = (e) => {
    e.target.style.opacity = "0.4";
    e.target.classList.add("dragged-card");
    document.querySelectorAll(".card:not(.dragged-card)").forEach((card) => {
      card.style.pointerEvents = "none";
    });
    cardDraggedStart(columnId, id);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    document.querySelectorAll(".card:not(.dragged-card)").forEach((card) => {
      card.style.pointerEvents = cardStyle.pointerEvents;
      card.style.backgroundColor = cardStyle.backgroundColor;
    });
    e.target.classList.remove("dragged-card");
  };

  if (editMode) {
    return (
      <div className="card" style={phantomCardStyle}>
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
        {phantomCard ? (
          <button style={buttonStyle} onClick={handleAddCard}>
            Add Card
          </button>
        ) : (
          <button style={buttonStyle} onClick={handleEditCard}>
            Set Card
          </button>
        )}
      </div>
    );
  }
  return (
    <div
      className="card"
      style={cardStyle}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h5 style={iconsWrapperStyle}>
        <span onClick={handleSetEditMode} style={iconStyle}>
          ✍️
        </span>
        <span onClick={handleDeleteCard} style={deleteIconStyle}>
          🗑
        </span>
      </h5>
      <h5>{title}</h5>
      <div> {content} </div>
    </div>
  );
}

export default Card;
