const { Shot } = require("./shot");
const { Swipe } = require("./swipe");
const { Player } = require("./player");

class GameState {
  constructor() {
    this.players = {};
    this.gameObjects = {};
  }

  update() {
    Object.keys(this.players).forEach((key) => {
      const player = this.players[key];
      player.update();

      Object.keys(this.gameObjects).forEach((key) => {
        const gameObject = this.gameObjects[key];
        const actions = gameObject.update();

        actions.forEach((action) => {
          action.execute(this);
        });

        if (
          player.x < gameObject.x + gameObject.width &&
          player.x + player.width > gameObject.x &&
          player.y < gameObject.y + gameObject.height &&
          player.y + player.height > gameObject.y
        ) {
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
    });
  }

  addGameObject(gameObject) {
    this.gameObjects = { ...this.gameObjects, [gameObject.id]: gameObject };
  }

  removeGameObject(id) {
    delete this.gameObjects[id];
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
      const [actionRequired, action] = this.players[playerId].handleUserCommand(
        userCommand
      );
      if (actionRequired) {
        const { name, x, y, direction } = action;
        const id = Math.floor(Math.random() * 90000) + 10000;
        switch (name) {
          case "swipe":
            this.addGameObject(new Swipe(id, x, y, direction));
            break;
          case "shoot":
            this.addGameObject(new Shot(id, x, y, direction));
            break;
          default:
            break;
        }
      }
    }
  }
}

module.exports = { GameState };
