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
      const [actionRequired, action] =
        this.players[playerId].handleUserCommand(userCommand);
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
