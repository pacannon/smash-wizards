const { GameObject } = require("./gameObject");


const gravity = -0.08;
class Player extends GameObject {
  constructor(id) {
    super({ id: id, x: 400, y: 400, width: 100, height: 100});
    this.id = id; // Player ID
    //Velocity Information

    this.topSpeed = 40;  //Top Velocity
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
    this.vx *= .9
  }

  move(direction) {
    this.facingDirection = direction;
    if (Math.abs(this.vx) < this.topSpeed) {
      this.vx += direction === "right" ? 2 : -2;
    }
  }

  jump() {
    
  }

  handleUserCommand(userCommand) {
    const { KeyW, KeyA, KeyS, KeyD, KeyG, Space } = userCommand;
    
    //LEFT
    if (KeyA) {
      this.move('left');
    }
    
    //RIGHT
    if (KeyD) {
      this.move('right');
    } 

    // DEV: turn on and off gravity
    if (KeyG) {
      this.isTouchingSurface = !this.isTouchingSurface;
    } 

    if (Space && this.isTouchingSurface) {
      this.vy += 4;
      this.isTouchingSurface = false;
      setTimeout(() => {
        this.isTouchingSurface = true;
      }, 500);
    }
  }
}

module.exports = { Player }
