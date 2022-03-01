import React, { useContext } from "react";

const initialState = [
  {
    name: "TODO",
    cards: [
      {
        title: "Discover a new planet",
        content: "Marvin, the Martian, we need you!",
      },
    ],
  },
  {
    name: "In Progress",
    cards: [
      { title: "Create a Trello Clone", content: "It's not going well y'all!" },
      {
        title: "Learn React",
        content: "I've never used Context API before 😥",
      },
    ],
  },
  {
    name: "In Review",
    cards: [
      {
        title: "World domination!",
        content: "Help Pinkly and Brain in their world domination plan.",
      },
      {
        title: "Dumb prank",
        content:
          "Call a random person just to tell them that you cannot talk right now",
      },
    ],
  },
  {
    name: "Done",
    cards: [
      {
        title: "Walk the dinosaur",
        content:
          "In the Jurassic era, only you can take your dinosaur for a walk",
      },
    ],
  },
];

const TrelloContext = React.createContext({
  trelloColumns: [],
  addColumn: () => {},
  deleteColumn: () => {},
  addCard: () => {},
  deleteCard: () => {},
  editCard: () => {},
});
export const TrelloContextConsumer = TrelloContext.Consumer;

export const TrelloContextProvider = ({ children }) => {
  const [trelloColumns, setTrelloColumns] = React.useState(initialState);

  const addColumn = (name) => {
    setTrelloColumns([
      ...trelloColumns,
      {
        name,
        cards: [],
      },
    ]);
  };

  const deleteColumn = (columnId) => {
    setTrelloColumns(
      trelloColumns.filter((column, index) => index !== columnId)
    );
  };

  const addCard = (title, content, columnIndex) => {
    const newCard = { title, content };
    const targetColumn = trelloColumns[columnIndex];

    targetColumn.cards.push(newCard);

    const leftCols = trelloColumns.slice(0, columnIndex);
    const rightCols = trelloColumns.slice(columnIndex + 1);
    setTrelloColumns([...leftCols, targetColumn, ...rightCols]);
  };

  const deleteCard = (columnIndex, cardIndex) => {
    const targetColumn = trelloColumns[columnIndex];
    targetColumn.cards.splice(cardIndex, 1);

    const leftCols = trelloColumns.slice(0, columnIndex);
    const rightCols = trelloColumns.slice(columnIndex + 1);
    setTrelloColumns([...leftCols, targetColumn, ...rightCols]);
  };

  const editCard = (newTitle, newContent, columnIndex, cardIndex) => {
    const targetColumn = trelloColumns[columnIndex];
    targetColumn.cards[cardIndex].title = newTitle;
    targetColumn.cards[cardIndex].content = newContent;

    const leftCols = trelloColumns.slice(0, columnIndex);
    const rightCols = trelloColumns.slice(columnIndex + 1);
    setTrelloColumns([...leftCols, targetColumn, ...rightCols]);
  };

  return (
    <TrelloContext.Provider
      value={{
        trelloColumns,
        addColumn,
        deleteColumn,
        addCard,
        deleteCard,
        editCard,
      }}
    >
      {children}
    </TrelloContext.Provider>
  );
};

export const useTrelloContext = () => {
  const context = useContext(TrelloContext);
  if (context == null) {
    throw new Error(
      `You forgot to wrap your component in <${TrelloContext.displayName}.Provider>.`
    );
  }
  return context;
};
