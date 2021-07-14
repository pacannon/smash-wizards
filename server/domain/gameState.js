const Matter = require("matter-js");
const cuid = require("cuid");

const { Shot } = require("./shot");
const { Swipe } = require("./swipe");
const { Player } = require("./player");
const { GameObject } = require("./gameObject");

class GameState {
  constructor() {
    this.players = {};
    this.gameObjects = {};
    this.bodiesToGameObjects = {};
    this.engine = Matter.Engine.create({ gravity: { x: 0, y: -0.8 } });

    // Matter.Events.on(this.engine, "collisionStart", (e) => {
    //   const joinedArray = [
    //     ...Object.keys(this.players).map((prop) => this.players[prop]),
    //     ...Object.keys(this.gameObjects).map((prop) => this.gameObjects[prop]),
    //   ];

    //   const collisions = e.pairs
    //     .map((collision) => [collision.bodyA.id, collision.bodyB.id])
    //     .flat();

    //   let affectedEntities = joinedArray.filter(({ id }) =>
    //     collisions.includes(id)
    //   );

    //   affectedEntities.forEach((entity) => {
    //     let actions = entity.collide();
    //     console.log(actions);
    //     actions.forEach((action) => action.execute(this));
    //   });
    // });

    Matter.Events.on(this.engine, "collisionActive", (e) => {
      const actions = e.pairs.flatMap(({bodyA, bodyB}) => {
        const gameObjectA = this.bodiesToGameObjects[bodyA.id];
        const gameObjectB = this.bodiesToGameObjects[bodyB.id];
        return [...gameObjectA.collide(gameObjectB), ...gameObjectB.collide(gameObjectA)]
      });

      this.resolveActions(actions);
    });
  }

  resolveActions(actions) {
    if (actions.length === 0) {
      return 0;
    } else {
      return this.resolveActions(actions.flatMap((action, i) => action.execute(this)))
    }
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
    this.bodiesToGameObjects[gameObject.body.id] = gameObject;
    this.gameObjects = { ...this.gameObjects, [gameObject.id]: gameObject };
  }

  removeGameObject(id) {
    Matter.Composite.remove(this.engine.world, this.gameObjects[id].body);
    delete this.bodiesToGameObjects[this.gameObjects[id].body.id];
    delete this.gameObjects[id];
  }

  addPlayer(id) {
    const player = new Player(id);
    Matter.Composite.add(this.engine.world, player.body);
    this.bodiesToGameObjects[player.body.id] = player;

    this.players = { ...this.players, [id]: player };
  }

  removePlayer(id) {
    Matter.Composite.remove(this.engine.world, this.players[id].body);
    delete this.bodiesToGameObjects[this.gameObjects[id]?.body.id];
    delete this.players[id];
  }

  handleUserCommand(playerId, userCommand) {
    if (Object(this.players).hasOwnProperty(playerId)) {
      const [actionRequired, action] = this.players[playerId].handleUserCommand(
        userCommand
      );
      if (actionRequired) {
        const { name, x, y, direction } = action;
        const id = cuid();
        switch (name) {
          case "swipe":
            this.addGameObject(new Swipe(id, playerId, x, y, direction));
            break;
          case "shoot":
            this.addGameObject(new Shot(id, playerId, x, y, direction));
            break;
          default:
            break;
        }
      }
    }
  }

  toClient() {
    const { engine, players, gameObjects } = this;

    let clientPlayers = Object.fromEntries(
      Object.entries(players).map(([playerId, player]) => [
        playerId,
        player.toClient(),
      ])
    );
    let clientGameObjects = Object.fromEntries(
      Object.entries(gameObjects).map(([gameObjectId, gameObject]) => [
        gameObjectId,
        gameObject.toClient(),
      ])
    );

    return { players: clientPlayers, gameObjects: clientGameObjects };
  }
}

module.exports = { GameState };
