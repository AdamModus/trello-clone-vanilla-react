import React from "react";
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

class Column extends React.Component {
  render() {
    if (this.props.phantomColumn) {
      return (
        <div style={columnStyle}>
          <h3>
            <input type="text" placeholder="Add a new column" id="phantomCol" />
          </h3>
          <button>Add column</button>
        </div>
      );
    }
    return (
      <div style={columnStyle}>
        <h3> {this.props.name} </h3>

        <div style={cardContainerStyle}>
          {this.props.cards.map((card, index) => {
            return (
              <Card key={index} title={card.title} content={card.content} />
            );
          })}
          <Card phantomCard />
        </div>
      </div>
    );
  }
}

export default Column;
