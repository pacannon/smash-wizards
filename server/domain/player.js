const { GameObject } = require("./gameObject");


const gravity = -0.08;
class Player extends GameObject {
  constructor(id) {
    super({ id: id, x: 400, y: 400, width: 100, height: 100 });
    this.id = id; // Player ID
    //Velocity Information

    this.topSpeed = 40; //Top Velocity
    this.vx = 0; // Horizontal Velocity
    this.vy = 0; // Vertical Velocity
    this.direction = "right"; // Direction Facing
    this.facingDirection = "right";
    this.isTouchingSurface = true; // Is in contact with surface
  }

  // Update Function ran every gameloop
  update() {
    this.vy += gravity
    this.y = this.y + this.vy
    this.x = this.x + this.vx;
    this.vx *= 0.9;
  }

  move(direction) {
    this.facingDirection = direction;
    if (Math.abs(this.vx) < this.topSpeed) {
      this.vx += direction === "right" ? 2 : -2;
    }
  }

  swipe() {
    let displacement = 0;
    let widthDisplacement = this.width / 2;
    if (this.facingDirection === "right") {
      displacement += widthDisplacement + this.vx + 10;
    } else {
      displacement -= widthDisplacement + this.vx + 10;
    }
    return [
      true,
      {
        name: "swipe",
        direction: this.facingDirection,
        x: this.x + displacement,
        y: this.y,
      },
    ];
  }

  shoot() {
    let displacement = 0;
    let widthDisplacement = this.width / 2;
    if (this.facingDirection === "right") {
      displacement += widthDisplacement + this.vx + 10;
    } else {
      displacement -= widthDisplacement + this.vx + 10;
    }
    return [
      true,
      {
        name: "shoot",
        direction: this.facingDirection,
        x: this.x + displacement,
        y: this.y,
      },
    ];
  }

  handleUserCommand(userCommand) {
    const { KeyW, KeyA, KeyK, KeyL, KeyD, KeyG, Space } = userCommand;

    //LEFT
    if (KeyA) {
      this.move("left");
    }

    //RIGHT
    if (KeyD) {
      this.move("right");
    }

    //Close Range Attack
    if (KeyK) {
      return this.swipe();
    }

    //Long Range Attack
    if (KeyL) {
      return this.shoot();
    }

    // DEV: turn on and off gravity
    if (KeyG) {
      this.isTouchingSurface = !this.isTouchingSurface;
    }

    if ((KeyW || Space) && this.isTouchingSurface) {
      this.vy += 4;
      this.isTouchingSurface = false;
      setTimeout(() => {
        this.isTouchingSurface = true;
      }, 500);
    }

    return [false];
  }
}

module.exports = { Player };
