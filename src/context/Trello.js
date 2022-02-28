import React from "react";

export const trelloColumns = [
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

export const TrelloContext = React.createContext(trelloColumns);
