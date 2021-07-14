const { GameObject } = require("./domain/gameObject");
let { GameState } = require("./domain/gameState");

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let gameStates = {};

const generateRoom = () => {
  let gameState = new GameState();
  const gameObject1 = new GameObject({
    id: 1,
    x: 150,
    y: 450,
    width: 100,
    height: 100,
  });
  const gameObject2 = new GameObject({
    id: 2,
    x: 550,
    y: 450,
    width: 100,
    height: 100,
  });
  const gameObject3 = new GameObject({
    id: 3,
    x: 550,
    y: 50,
    width: 1000,
    height: 100,
  });
  const gameObject4 = new GameObject({
    id: 4,
    x: 950,
    y: 240,
    width: 400,
    height: 15,
    angle: (2*Math.PI)*(15/360)
  });
  const gameObject5 = new GameObject({
    id: 5,
    x: 1350,
    y: 450,
    width: 100,
    height: 100,
  });
  gameState.addGameObject(gameObject1);
  gameState.addGameObject(gameObject2);
  gameState.addGameObject(gameObject3);
  gameState.addGameObject(gameObject4);
  gameState.addGameObject(gameObject5);
  return gameState;
};

io.on("connection", (client) => {
  let roomId = "";
  client.on("join", ({ id }) => {
    roomId = `room-${id}`;

    if (gameStates[roomId] === undefined) {
      gameStates[roomId] = generateRoom();
    }

    client.join(`room-${id}`);
    gameStates[roomId].addPlayer(client.id);
    client.emit("joined");
  });
  client.on("userCommand", (userCommand) => {
    gameStates[roomId].handleUserCommand(client.id, userCommand);
  });
  client.on("disconnect", () => {
    gameStates[roomId].removePlayer(client.id);
  });
});

server.listen(3030);

setInterval(() => {
  Object.keys(gameStates).forEach((roomId) => {
    gameStates[roomId].update();
    io.to(roomId).emit("gameState", gameStates[roomId].toClient());
  });
}, 17);
