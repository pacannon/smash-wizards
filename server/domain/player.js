const Matter = require("matter-js");
const { Remove } = require("./actions/remove");

const { GameObject } = require("./gameObject");

class Player extends GameObject {
  constructor(id) {
    super({ id: id, x: 400, y: 400, width: 100, height: 100 });
    this.id = id; // Player ID

    this.health = 100;

    //Velocity Information

    this.topSpeed = 3; //Top Velocity
    this.vx = 0; // Horizontal Velocity
    this.vy = 0; // Vertical Velocity
    this.direction = "right"; // Direction Facing
    this.facingDirection = "right";
    this.isTouchingSurface = true; // Is in contact with surface

    Matter.Body.setStatic(this.body, false);
    Matter.Body.setInertia(this.body, Number.POSITIVE_INFINITY);
  }

  // Update Function ran every gameloop
  update() {
    this.x = this.body.position.x;
    this.y = this.body.position.y;
    this.vx = this.body.velocity.x;
    this.vy = this.body.velocity.y;
  }

  collide() {
    this.health -= 1;
    return this.health <= 1 ? [new Remove(this.id, true)] : [];
  }

  move(direction) {
    this.facingDirection = direction;
    if (Math.abs(this.vx) < this.topSpeed) {
      Matter.Body.applyForce(
        this.body,
        Matter.Vector.create(this.body.position.x, this.body.position.y),
        Matter.Vector.create(direction === "right" ? 0.1 : -0.1, 0)
      );
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

    // DEV: do damage
    if (KeyG) {
      this.health -= 10;
    }

    if ((KeyW || Space) && this.isTouchingSurface) {
      this.body.force = { x: 0, y: 0.4 };
    }

    return [false];
  }
}

module.exports = { Player };
