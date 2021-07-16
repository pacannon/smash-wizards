let skills = [
  {
    id: "fast-shot",
    title: "Fast Shot",
    tooltip: {
      content: "Makes bullets shoot 10% faster",
    },
    children: [
      {
        id: "double-shot",
        title: "Double Shot",
        tooltip: {
          content: "Shoots out 2 bullets instead of 1",
        },
        children: [
          {
            id: "triple-shot",
            title: "Triple Shot",
            tooltip: {
              content: "Shoots out 3 bullets instead of 2",
            },
            children: [],
          },
        ],
      },
      {
        id: "bouncy-shot",
        title: "Bouncy Shot",
        tooltip: {
          content: "Gives shots a layer of rubber to all them bounce around",
        },
        children: [],
      },
    ],
  },
];

export default {
  id: "Shot",
  skills,
};
