let skills = [
  {
    id: "more-health",
    title: "Higher Health",
    tooltip: {
      content: "Increase Health Cap + 30",
    },
    children: [
      {
        id: "passive-regen",
        title: "Regenerate Health",
        tooltip: {
          content: "Regenerate Health + 1 / 5 sec",
        },
        children: [],
      },
      {
        id: "Necromancer",
        title: "Steal Health",
        tooltip: {
          content: "Steal 25% of damage dealt",
        },
        children: [],
      },
    ],
  },
];

export default {
  id: "Health",
  skills,
};
