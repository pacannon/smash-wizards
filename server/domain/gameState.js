const { Player } = require('./player');

class GameState {
  constructor() {
    this.players = [];
    this.gameObjects = [];
  }

  update() {
    Object.keys(this.players).forEach((key) => {
      const player = this.players[key];
      player.update()

      this.gameObjects.forEach(gameObject => {
        if(player.x < gameObject.x + gameObject.width &&
        player.x + player.width > gameObject.x &&
        player.y < gameObject.y + gameObject.height &&
        player.y + player.height > gameObject.y) {
    
          const timeCollisionRightOfGameObject =
            (player.left - gameObject.right) / player.vx;
          const timeCollisionLeftOfGameObject =
            (player.right - gameObject.left) / player.vx;
          const timeCollisionTopOfGameObject =
            (gameObject.top - player.bottom) / player.vy;
          const timeCollisionBottomOfGameObject =
            (gameObject.bottom - player.top) / player.vy;

          if (player.vx > 0 && timeCollisionLeftOfGameObject > 0) {
            player.vx = 0;
            player.right = gameObject.left;
          }
          if (player.vx < 0 && timeCollisionRightOfGameObject > 0) {
            player.vx = 0;
            player.left = gameObject.right;
          }
        }
      });
    })
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
