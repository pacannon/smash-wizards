const { Player } = require("./player");

class GameState {
  constructor() {
    this.players = [];
    this.gameObjects = [];
  }

  update() {
    Object.keys(this.players).forEach((key) => {
      const player = this.players[key];
      player.update();

      this.gameObjects.forEach((gameObject) => {
        if (player.intersects(gameObject)) {
          const timeCollisionRightOfGameObject =
            (player.left - gameObject.right) / player.vx;
          const timeCollisionLeftOfGameObject =
            (player.right - gameObject.left) / player.vx;
          const timeCollisionTopOfGameObject =
            (player.bottom - gameObject.top) / player.vy;
          const timeCollisionBottomOfGameObject =
            (player.top - gameObject.bottom) / player.vy;

          console.log(
            `right: ${timeCollisionRightOfGameObject}, left ${timeCollisionLeftOfGameObject}, top: ${timeCollisionTopOfGameObject}, bottom: ${timeCollisionBottomOfGameObject}`
          );

          if (player.vx > 0 && timeCollisionLeftOfGameObject > 0) {
            player.vx = 0;
            player.right = gameObject.left;
          }
          if (player.vx < 0 && timeCollisionRightOfGameObject > 0) {
            player.vx = 0;
            player.left = gameObject.right;
          }
          if (player.vy > 0 && timeCollisionBottomOfGameObject > 0) {
            player.vy = 0;
            player.top = gameObject.bottom;
          }
          if (player.vy < 0 && timeCollisionTopOfGameObject > 0) {
            player.vy = 0;
            player.bottom = gameObject.top;
          }
        }
      });
    });
  }

  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
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
