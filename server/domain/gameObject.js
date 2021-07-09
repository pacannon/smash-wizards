class GameObject {
  constructor({ id, x = 0, y = 0, width = 1, height = 1, color = "brown" }) {
    this.id = id;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
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

  set top(value) {
    this.y = this.y + (value - this.top);
  }

  get bottom() {
    return this.y - this.height / 2;
  }

  set bottom(value) {
    this.y = this.y + (value - this.bottom);
  }

  intersects(gameObject) {
    const aLeftOfB = this.right < gameObject.left;
    const aRightOfB = this.left > gameObject.right;
    const aAboveB = this.bottom > gameObject.top;
    const aBelowB = this.top < gameObject.bottom;

    return !( aLeftOfB || aRightOfB || aAboveB || aBelowB );
  }

  update() {}
}

module.exports = { GameObject };
