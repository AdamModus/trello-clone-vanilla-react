import React from "react";

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

class Column extends React.Component {
  render() {
    if (this.props.phantomCard) {
      return (
        <div style={phantomCardStyle} id="phantomCard">
          <h5>
            <input
              type="text"
              placeholder="New card title"
              id="phantomCardTitle"
            />
          </h5>
          <input
            type="text"
            placeholder="New card content"
            id="phantomCardContent"
          />
          <button style={buttonStyle}>Add card</button>
        </div>
      );
    }
    return (
      <div style={cardStyle}>
        <h5> {this.props.title} </h5>
        <div> {this.props.content} </div>
      </div>
    );
  }
}

export default Column;
