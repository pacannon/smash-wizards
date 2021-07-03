

const gravity = 8;
class Player {
  constructor(id) {
    this.id = id; // Player ID
    //Velocity Information

    this.topSpeed = 40;  //Top Velocity
    this.horizontalSpeed = 0; // Horizontal Velocity
    this.verticalSpeed = 0; // Vertical Velocity
    this.direction = "right"; // Direction Facing
    this.facingDirection = "right";
    this.x = 400; // Current Position -- X
    this.y = 400; // Current Position -- Y
    this.isTouchingSurface = true; // Is in contact with surface
  }

  // Update Function ran every gameloop
  update() {
    if (!this.isTouchingSurface) {
      this.y += gravity
    }
    if (this.horizontalSpeed > 0) {
      if (this.direction == 'right') {
        this.x = this.x + this.horizontalSpeed;
      } else {
        this.x = this.x - this.horizontalSpeed;
      }
      this.horizontalSpeed -= .2
    }
  }

  move(direction) {
    this.facingDirection = direction
      if (this.horizontalSpeed < this.topSpeed && this.facingDirection == this.direction) {
        this.horizontalSpeed += 2;
      }
      if ( this.horizontalSpeed <= 0) {
        this.direction = direction
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
      this.y -= 200;
      this.isTouchingSurface = false;
      setTimeout(() => {
        this.isTouchingSurface = true;
      }, 500);
    }
  }
}

module.exports = { Player }
