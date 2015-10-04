import events = require("events");

export class AxisEvent
{
  private _value:number;

  public get value():number
  {
    return this._value;
  }

  constructor(value:number)
  {
    this._value = value;
  }
}

interface AxisCallback
{
  (e:AxisEvent): void;
}

class AxisDict
{
  [name:string]: AxisCallback;
}

class ActionDict
{
  [name:string]: Function;
}

class KeyboardInputConfig
{
  [name:string]: number;
}

class AxisDownDict
{
  [name:string]: KeyboardEvent;
}

export class InputComponent
{
  map: KeyboardInputConfig;
  eventEmitter: events.EventEmitter;
  axisInputs: AxisDict = new AxisDict();
  actionInputs: ActionDict = new ActionDict();

  downAxis: AxisDownDict = new AxisDownDict();

  constructor()
  {
    this.eventEmitter = new events.EventEmitter();

    // TODO make a config file
    this.map =
    {
      "MoveLeft": 37,
      "MoveUp":  38,
      "MoveRight": 39,
      "MoveDown": 40,
    };

    window.addEventListener("keydown", x => this.keyDownHandler(x));
    window.addEventListener("keyup", x => this.keyUpHandler(x));
  }

  private keyDownHandler(x: KeyboardEvent)
  {
    for (var axis in this.map)
    {
      var key = this.map[axis];

      if (key == x.keyCode)
      {
        this.downAxis[axis] = x;
      }
    }
  }

  private keyUpHandler(x: KeyboardEvent)
  {
    for (var axis in this.map)
    {
      var key = this.map[axis];

      if (key == x.keyCode && this.downAxis[axis])
      {
        var axisInput = this.axisInputs[axis];

        delete this.downAxis[axis];
        axisInput(new AxisEvent(0));
      }
    }
  }

  public bindAxis(name:string, cb:AxisCallback)
  {
    this.axisInputs[name] = cb;
  }

  public bindAction(name:string, cb:Function)
  {
    this.actionInputs[name] = cb;
  }

  public tick()
  {
    for (var axis in this.downAxis)
    {
      // TODO Could use event timestamp and get how long the button is down
      var event = new AxisEvent(1);

      var axisInput = this.axisInputs[axis];
      if (axisInput)
      {
        axisInput(event);
      }
    }
  }
}
