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
  addCard: () => {},
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

  const addCard = (title, content, columnIndex) => {
    const newCard = { title, content };
    const targetColumn = trelloColumns[columnIndex];

    targetColumn.cards.push(newCard);

    const leftCols = trelloColumns.slice(0, columnIndex);
    const rightCols = trelloColumns.slice(columnIndex + 1);
    setTrelloColumns([...leftCols, targetColumn, ...rightCols]);
  };

  return (
    <TrelloContext.Provider value={{ trelloColumns, addColumn, addCard }}>
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
