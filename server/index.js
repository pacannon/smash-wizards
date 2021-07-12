const { GameObject } = require("./domain/gameObject");
let { GameState } = require("./domain/gameState");

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let gameState = new GameState();
const gameObject1 = new GameObject({ id: 1, x: 150, y: 450, width: 100, height: 100 });
const gameObject2 = new GameObject({ id: 2, x: 550, y: 450, width: 100, height: 100 });
const gameObject3 = new GameObject({ id: 3, x: 550, y: 50, width: 1000, height: 100 });
gameState.addGameObject(gameObject1);
gameState.addGameObject(gameObject2);
gameState.addGameObject(gameObject3);

// gameState.addGameObject(gameObject1);
// gameState.addGameObject(gameObject2);

io.on("connection", (client) => {
  gameState.addPlayer(client.id);
  client.on("userCommand", (userCommand) => {
    gameState.handleUserCommand(client.id, userCommand);
  });
  client.on("disconnect", () => {
    gameState.removePlayer(client.id);
  });
});

server.listen(3030);

setInterval(() => {
  gameState.update();
  io.emit("gameState", gameState.toClient());
}, 17);
