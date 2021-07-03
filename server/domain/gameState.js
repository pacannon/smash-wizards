const { Player } = require('./player');

class GameState {
  constructor() {
    this.players = [];
  }

  addPlayer(id) {
    const player = new Player(id);

    this.players = { ...this.players, [id]: player };
  }

  removePlayer(id) {
    delete this.players[id];
  }

  handleUserCommand(playerId, userCommand) {
    if (Object(this.players).hasOwnProperty(playerId)) {
      this.players[playerId].handleUserCommand(userCommand);
    }
  }
}

module.exports = { GameState };
