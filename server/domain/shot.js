const { GameObject } = require("./gameObject");
const { Remove } = require("./actions/remove");

class Shot extends GameObject {
  constructor(id, x, y, direction) {
    super({ id: id, x, y, width: 10, height: 10, color: "purple" });
    this.direction = direction;
    this.createdAt = Date.now();
    this.speed = 5;

    this.body.isSensor = true;
  }

  update() {
    this.x += this.direction === "right" ? this.speed : -this.speed;

    const elapsed = Math.floor((Date.now() - this.createdAt) / 1000);
    if (elapsed >= 2) {
      return [new Remove(this.id)];
    }
    return [];
  }
}

module.exports = { Shot };
