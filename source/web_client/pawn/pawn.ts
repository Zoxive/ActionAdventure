import PawnAnimation = require("./pawnanimation.ts");
import MovementVector = require("../character/movementvector.ts");
import CharacterDirection = require("../character/characterdirection.ts");

class Pawn extends PIXI.Container
{
  private movement: MovementVector;

  private animation:PawnAnimation;

  constructor(hulk:any)
  {
    super();

    // TODO move this animation stuff somewhere
    var pawnTexture = hulk.textures["12.png"];

    var upFrames:PIXI.Texture[] = [];
    upFrames.push(hulk.textures["12.png"]);
    upFrames.push(hulk.textures["13.png"]);
    upFrames.push(hulk.textures["14.png"]);
    upFrames.push(hulk.textures["15.png"]);

    var downFrames:PIXI.Texture[] = [];
    downFrames.push(hulk.textures["0.png"]);
    downFrames.push(hulk.textures["1.png"]);
    downFrames.push(hulk.textures["2.png"]);
    downFrames.push(hulk.textures["3.png"]);

    var rightFrames:PIXI.Texture[] = [];
    rightFrames.push(hulk.textures["8.png"]);
    rightFrames.push(hulk.textures["9.png"]);
    rightFrames.push(hulk.textures["10.png"]);
    rightFrames.push(hulk.textures["11.png"]);

    var leftFrames:PIXI.Texture[] = [];
    leftFrames.push(hulk.textures["4.png"]);
    leftFrames.push(hulk.textures["5.png"]);
    leftFrames.push(hulk.textures["6.png"]);
    leftFrames.push(hulk.textures["7.png"]);

    this.movement = MovementVector.BlankMovement;

    this.animation = new PawnAnimation(CharacterDirection.down, upFrames, downFrames, rightFrames, leftFrames);

    this.addChild(this.animation);
  }

  addMovementInput(movement: MovementVector)
  {
    // Merge
    if (this.movement.isMoving())
    {
      this.movement = new MovementVector(this.movement.x + movement.x, this.movement.y + movement.y);
    }
    else
    {
      this.movement = movement;
    }
  }

  render()
  {
    var speed = 2;

    if (this.movement.isMovingDiag())
      speed = 1.5;

    this.y += this.movement.y * speed;
    this.x += this.movement.x * speed;

    if (this.movement.isMoving())
      this.animation.play(this.movement.direction());
    else
      this.animation.stop();

    this.movement = MovementVector.BlankMovement;
  }
}

export = Pawn;
