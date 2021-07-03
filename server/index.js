let { GameState } = require('./domain/gameState');

const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let gameState = new GameState();


io.on('connection', client => {
  gameState.addPlayer(client.id);
  console.log(gameState)
  client.on('userCommand', userCommand => {
    gameState.handleUserCommand(client.id, userCommand);
   });
  client.on('disconnect', () => { 
    gameState.removePlayer(client.id)
  });
});
server.listen(3030);

setInterval(() => {
  io.emit("gameState", gameState);
}, 1000)
