import React, { useContext } from "react";

const defaultState = [
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

let initialState;
const sessionState = sessionStorage.getItem("trello-state");
if (sessionState) {
  initialState = JSON.parse(sessionState);
} else {
  initialState = defaultState;
}

const TrelloContext = React.createContext({
  trelloColumns: [],
  addColumn: () => {},
  deleteColumn: () => {},
  addCard: () => {},
  deleteCard: () => {},
  editCard: () => {},
  cardDraggedStart: () => {},
  cardDraggedEnd: () => {},
});
export const TrelloContextConsumer = TrelloContext.Consumer;

export const TrelloContextProvider = ({ children }) => {
  const [trelloColumns, setTrelloColumns] = React.useState(initialState);
  const [draggedCardMetadata, setDraggedCardMetadata] = React.useState(null);

  const setTrelloColumnsWithSideEffect = (newTrelloColumns) => {
    setTrelloColumns(newTrelloColumns);
    sessionStorage.setItem("trello-state", JSON.stringify(newTrelloColumns));
  };

  const addColumn = (name) => {
    setTrelloColumnsWithSideEffect([
      ...trelloColumns,
      {
        name,
        cards: [],
      },
    ]);
  };

  const deleteColumn = (columnId) => {
    setTrelloColumnsWithSideEffect(
      trelloColumns.filter((column, index) => index !== columnId)
    );
  };

  const addCard = (title, content, columnIndex) => {
    const newCard = { title, content };
    const targetColumn = trelloColumns[columnIndex];

    targetColumn.cards.push(newCard);

    const leftCols = trelloColumns.slice(0, columnIndex);
    const rightCols = trelloColumns.slice(columnIndex + 1);
    setTrelloColumnsWithSideEffect([...leftCols, targetColumn, ...rightCols]);
  };

  const deleteCard = (columnIndex, cardIndex) => {
    const targetColumn = trelloColumns[columnIndex];
    targetColumn.cards.splice(cardIndex, 1);

    const leftCols = trelloColumns.slice(0, columnIndex);
    const rightCols = trelloColumns.slice(columnIndex + 1);
    setTrelloColumnsWithSideEffect([...leftCols, targetColumn, ...rightCols]);
  };

  const editCard = (newTitle, newContent, columnIndex, cardIndex) => {
    const targetColumn = trelloColumns[columnIndex];
    targetColumn.cards[cardIndex].title = newTitle;
    targetColumn.cards[cardIndex].content = newContent;

    const leftCols = trelloColumns.slice(0, columnIndex);
    const rightCols = trelloColumns.slice(columnIndex + 1);
    setTrelloColumnsWithSideEffect([...leftCols, targetColumn, ...rightCols]);
  };

  const cardDraggedStart = (columnIndex, cardIndex) => {
    setDraggedCardMetadata({ columnIndex, cardIndex });
  };

  const cardDraggedEnd = (newColumnIndex) => {
    const oldColumnIndex = draggedCardMetadata.columnIndex;
    const oldCardIndex = draggedCardMetadata.cardIndex;
    if (
      isNaN(oldColumnIndex) ||
      isNaN(oldCardIndex) ||
      oldColumnIndex === newColumnIndex
    ) {
      setDraggedCardMetadata(null);
      return;
    }
    const draggedCard = trelloColumns[oldColumnIndex].cards[oldCardIndex];
    deleteCard(oldColumnIndex, oldCardIndex);
    addCard(draggedCard.title, draggedCard.content, newColumnIndex);
    setDraggedCardMetadata(null);
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
        cardDraggedStart,
        cardDraggedEnd,
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
