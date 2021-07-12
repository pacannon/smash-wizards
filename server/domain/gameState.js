const Matter = require('matter-js');

const { Shot } = require("./shot");
const { Swipe } = require("./swipe");
const { Player } = require("./player");
const { GameObject } = require("./gameObject");

class GameState {
  constructor() {
    this.players = {};
    this.gameObjects = {};
    this.engine = Matter.Engine.create({ gravity: { x:0, y: -0.8}});
  }

  update() {
    Matter.Engine.update(this.engine);

    Object.keys(this.players).forEach((key) => {
      const player = this.players[key];
      player.update();

      Object.keys(this.gameObjects).forEach((key) => {
        const gameObject = this.gameObjects[key];
        const actions = gameObject.update();

        actions.forEach((action) => {
          action.execute(this);
        });
      });
    });
  }

  /**
   * @param {GameObject} gameObject 
   */
  addGameObject(gameObject) {
    Matter.Composite.add(this.engine.world, gameObject.body);
    this.gameObjects = { ...this.gameObjects, [gameObject.id]: gameObject };
  }

  removeGameObject(id) {
    Matter.Composite.remove(this.engine.world, this.gameObjects[id].body);
    delete this.gameObjects[id];
  }

  addPlayer(id) {
    const player = new Player(id);
    Matter.Composite.add(this.engine.world, player.body);

    this.players = { ...this.players, [id]: player };
  }

  removePlayer(id) {
    Matter.Composite.remove(this.engine.world, this.players[id].body);
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

  toClient() {
    const { engine, players, gameObjects } = this;

    let clientPlayers = Object.fromEntries(Object.entries(players).map(([playerId, player]) => [playerId, player.toClient()]));
    let clientGameObjects = Object.fromEntries(Object.entries(gameObjects).map(([gameObjectId, gameObject]) => [gameObjectId, gameObject.toClient()]));

    return { players: clientPlayers, gameObjects: clientGameObjects };
  }
}

module.exports = { GameState };
