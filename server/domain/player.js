

class Player {
  constructor(id) {
    this.currentSpeed = 40;
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.direction = "right";
  }

  handleUserCommand(userCommand) {

  const { KeyW, KeyA, KeyS, KeyD, Space } = userCommand;
  //UP
  if (KeyW) {
    this.y = this.y - this.currentSpeed;
  }
  
  //DOWN
  if (KeyS) {
    this.y = this.y + this.currentSpeed;
  }
  
  //LEFT
  if (KeyA) {
    this.direction = 'left';
    this.x = this.x - this.currentSpeed;
  }
  
  //RIGHT
  if (KeyD) {
    this.direction = 'right';
    this.x = this.x + this.currentSpeed;
  } 
  }
}

module.exports = { Player }
