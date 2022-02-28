import React from "react";
import Column from "./components/Column";
import { trelloColumns, TrelloContext } from "./context/Trello";

const headerStyle = {
  textAlign: "center",
};

const colWrapperStyle = {
  display: "flex",
  gap: "10px",
  justifyContent: "space-around",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trelloColumns,
    };
  }

  render() {
    return (
      <div>
        <h1 style={headerStyle}>This is my react app!</h1>

        <TrelloContext.Provider value={this.state.trelloColumns}>
          <div style={colWrapperStyle}>
            {trelloColumns.map((column, index) => {
              return (
                <Column key={index} name={column.name} cards={column.cards} />
              );
            })}
            <Column phantomColumn />
          </div>
        </TrelloContext.Provider>
      </div>
    );
  }
}

export default App;
