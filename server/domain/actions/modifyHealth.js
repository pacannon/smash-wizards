const { Action } = require("./action");
const { Remove } = require("./remove");

class ModifyHealth extends Action {
  constructor(id, value, increment = false) {
    super();
    this.id = id;
    this.value = value;
    this.increment = increment;
  }

  execute(gameState) {
    const player = gameState.players[this.id];

    if (player !== undefined) {
      if (this.increment) {
        player.health += this.value
      } else {
        player.health = this.value;
      }
  
      if (player.health <= 0) {
        return [new Remove(this.id, true)];
      }
    }
    
    return [];
  }
}

module.exports = { ModifyHealth };
