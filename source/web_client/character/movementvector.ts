import CharacterDirection = require("./characterdirection.ts");

class MovementVector
{
  private _y: number;
  private _x: number;

  public get x():number
  {
    return this._x;
  }

  public get y():number
  {
    return this._y;
  }

  public isMovingUp():boolean
  {
    return this.y < 0;
  }

  public isMovingDown():boolean
  {
    return this.y > 0;
  }

  public isMovingLeft():boolean
  {
    return this.x < 0;
  }

  public isMovingRight():boolean
  {
    return this.x > 0;
  }

  public isMovingOnX():boolean
  {
    return this.isMovingLeft() || this.isMovingRight();
  }

  public isMovingOnY():boolean
  {
    return this.isMovingUp() || this.isMovingDown();
  }

  public isMoving():boolean
  {
    return this.isMovingOnY() || this.isMovingOnX();
  }

  public isMovingDiag():boolean
  {
    return this.isMovingOnX() && this.isMovingOnY();
  }

  public direction():CharacterDirection
  {
    if (this.isMovingUp())
      return CharacterDirection.up;
    if (this.isMovingDown())
      return CharacterDirection.down;

    if (this.isMovingLeft())
      return CharacterDirection.left;
    if (this.isMovingRight())
      return CharacterDirection.right;

    return CharacterDirection.none;
  }

  constructor(x:number, y:number)
  {
    this._x = x;
    this._y = y;
  }

  static get BlankMovement():MovementVector
  {
    return new MovementVector(0, 0);
  }
}

export = MovementVector;
