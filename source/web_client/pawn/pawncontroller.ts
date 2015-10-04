import Pawn = require("./pawn.ts");
import InputComponent = require("../inputcomponent.ts");
import MovementVector = require("../character/movementvector.ts");

class PawnController
{
  inputComponent: InputComponent.InputComponent;
  pawn:Pawn;

  constructor()
  {
    var inputComponent = new InputComponent.InputComponent();

    inputComponent.bindAxis("MoveUp", x => this.moveUp(x));
    inputComponent.bindAxis("MoveDown", x => this.moveDown(x));
    inputComponent.bindAxis("MoveRight", x => this.moveRight(x));
    inputComponent.bindAxis("MoveLeft", x => this.moveLeft(x));

    this.inputComponent = inputComponent;
  }

  tick()
  {
    this.inputComponent.tick();
  }

  setPawn(pawn:Pawn)
  {
    this.pawn = pawn;
  }

  getValue(value:number):number
  {
    var v = value * 0.05;

    if (v < 2)
      return 2;
    else
      return 2;
  }

  moveUp(e:InputComponent.AxisEvent)
  {
    if (this.pawn != null)
    {
      this.pawn.addMovementInput(new MovementVector(0, this.getValue(e.value) * -1));
    }
  }

  moveDown(e:InputComponent.AxisEvent)
  {
    if (this.pawn != null)
    {
      this.pawn.addMovementInput(new MovementVector(0, this.getValue(e.value) * 1));
    }
  }

  moveRight(e:InputComponent.AxisEvent)
  {
    if (this.pawn != null)
    {
      this.pawn.addMovementInput(new MovementVector(this.getValue(e.value), 0));
    }
  }

  moveLeft(e:InputComponent.AxisEvent)
  {
    if (this.pawn != null)
    {
      this.pawn.addMovementInput(new MovementVector(this.getValue(e.value) * -1, 0));
    }
  }
}

export = PawnController;
