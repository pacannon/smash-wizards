let skills = [
  {
    id: "add-defense",
    title: "Add Defense",
    tooltip: {
      content: "Gives the player a layer of defense -10% damage total",
    },
    children: [
      {
        id: "more-defense",
        title: "More Defense",
        tooltip: {
          content:
            "Gives the player a deeper layer of defense -20% damage total",
        },
        children: [],
      },
      {
        id: "block",
        title: "Block Bubble",
        tooltip: {
          content: "Gives the player ability to spawn bubble to protect itself",
        },
        children: [],
      },
    ],
  },
];

export default {
  id: "Defense",
  skills,
};
