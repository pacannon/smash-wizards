let { gameState, addPlayer } = require('./domain/gameState');

const server = require('http').createServer();
const io = require('socket.io')(server);



io.on('connection', client => {
  gameState = addPlayer(gameState, client.id)
  console.log(gameState)
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(3000);
