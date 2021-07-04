class GameObject {
  constructor({ id, x = 0, y = 0, width = 1, height = 1}) {
    this.id = id;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height= height;
  }

  get left() {
    return this.x - this.width / 2;
  }

  set left(value) {
    this.x = this.x + (value - this.left);
  }

  get right() {
    return this.x + this.width / 2;
  }

  set right(value) {
    this.x = this.x + (value - this.right);
  }

  get top() {
    return this.y + this.height / 2;
  }

  get bottom() {
    return this.y - this.height / 2;
  }

  set bottom(value) {
    this.y = this.y + this.bottom - value;
  }
}

module.exports = { GameObject };
