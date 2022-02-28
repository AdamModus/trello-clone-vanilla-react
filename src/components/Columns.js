import { useTrelloContext } from "../context/TrelloContextManagement";
import Column from "./Column";

const colsStyle = {
  display: "flex",
  gap: "10px",
  justifyContent: "space-around",
};

function Columns() {
  const { trelloColumns } = useTrelloContext();

  return (
    <div style={colsStyle}>
      {trelloColumns.map((column, index) => {
        return (
          <Column
            key={index}
            id={index}
            name={column.name}
            cards={column.cards}
          />
        );
      })}
      <Column phantomColumn />
    </div>
  );
}

export default Columns;
