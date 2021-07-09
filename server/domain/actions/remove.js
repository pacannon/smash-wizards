const { Action } = require("./action");

class Remove extends Action {
  constructor(gameObjectId) {
    super();
    this.gameObjectId = gameObjectId;
  }

  execute(gameState) {
    gameState.removeGameObject(this.gameObjectId);
  }
}

module.exports = { Remove };
