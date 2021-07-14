const { GameObject } = require("./gameObject");
const { Remove } = require("./actions/remove");
const { ModifyHealth } = require("./actions/modifyHealth");
class Swipe extends GameObject {
  constructor(id, attackerId, x, y, direction) {
    super({ id: id, x, y, width: 10, height: 10, color: "cyan" });
    this.direction = direction;
    this.createdAt = Date.now();
    this.speed = 5;

    this.attackerId = attackerId;

    this.body.isSensor = true;
  }

  update() {
    if (this.width <= 150) {
      this.width += this.speed;
      this.x += (this.direction === "right" ? this.speed : -this.speed) / 2;
    }

    const elapsed = Math.floor((Date.now() - this.createdAt) / 500);
    if (elapsed >= 0.5) {
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

module.exports = { Swipe };
