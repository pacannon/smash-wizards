const { Action } = require("./action");

class Remove extends Action {
  constructor(id, isPlayer = false) {
    super();
    this.id = id;
    this.isPlayer = isPlayer;
  }

  execute(gameState) {
    this.isPlayer
      ? gameState.removePlayer(this.id)
      : gameState.removeGameObject(this.id);
  }
}

module.exports = { Remove };
