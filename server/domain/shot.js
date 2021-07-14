const Matter = require("matter-js");

const { GameObject } = require("./gameObject");
const { Remove } = require("./actions/remove");
const { ModifyHealth } = require("./actions/modifyHealth");

class Shot extends GameObject {
  constructor(id, attackerId, x, y, direction) {
    super({ id: id, x, y, width: 10, height: 10, color: "purple" });
    this.createdAt = Date.now();
    this.velocity = 20 * (direction === "right" ? 1 : -1);

    this.attackerId = attackerId;

    this.body.isSensor = true;
    Matter.Body.setVelocity(this.body, Matter.Vector.create(this.velocity, 3));
    Matter.Body.setStatic(this.body, false);
  }

  update() {
    this.x = this.body.position.x;
    this.y = this.body.position.y;
    this.vx = this.body.velocity.x;
    this.vy = this.body.velocity.y;

    const elapsed = Math.floor((Date.now() - this.createdAt) / 1000);
    if (elapsed >= 2) {
      return [new Remove(this.id)];
    }
    return [];
  }

  collide(gameObject) {
    if (gameObject.id !== this.attackerId) {
      return [new Remove(this.id), new ModifyHealth(gameObject.id, -1, true)];
    }

    return [];
  }
}

module.exports = { Shot };
