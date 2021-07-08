const { GameObject } = require("./gameObject");

class Shot extends GameObject {
  constructor(id, x, y, direction) {
    super({ id: id, x, y, width: 10, height: 10, color: "purple" });
    this.direction = direction;
    this.createdAt = Date.now();
    this.speed = 5;
  }

  update() {
    this.x += this.direction === "right" ? this.speed : -this.speed;

    const elapsed = Math.floor((Date.now() - this.createdAt) / 1000);
    if (elapsed >= 2) {
      return [true, { name: "remove", id: this.id }];
    }
    return [false];
  }
}

module.exports = { Shot };
