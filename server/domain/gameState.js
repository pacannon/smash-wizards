const player = require('./player').player;

function gameState() {
  return {
    players: [],
  };
}

function addPlayer(gameState, id) {
  const newPlayer = player(id);

  return { ...gameState, players: [ ...gameState.players, newPlayer ] };
}

module.exports = { gameState, addPlayer };
