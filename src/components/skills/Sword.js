let skills = [
  {
    id: "deep-stab",
    title: "Deep Stab",
    tooltip: {
      content: "Makes the sword sharper 5+ damage",
    },
    children: [
      {
        id: "fire-enchant",
        title: "Fire Enchant",
        tooltip: {
          content: "Hot Aura around the blade, 2 damage/sec for 2 seconds",
        },
        children: [],
      },
      {
        id: "ice-enchant",
        title: "Ice Enchant",
        tooltip: {
          content: "Cold Aura around the blade, slows player for 2 seconds",
        },
        children: [],
      },
    ],
  },
];

export default {
  id: "Sword",
  skills,
};
