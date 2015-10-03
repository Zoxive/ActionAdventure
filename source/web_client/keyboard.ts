interface IKeyboardEvents
{
  onKeydown(keyCode:number, cb:Function):void;
  onKeyup(keyCode:number, cb:Function):void;
}

enum KeyboardKeyState
{
  down,
  up
}

class KeyboardKeyListener
{
  keyCode: number;
  cb:Function;

  constructor(keyCode:number, cb:Function)
  {
    this.keyCode = keyCode;
    this.cb = cb;
  }
}

class KeyboardEvents implements IKeyboardEvents
{
  private downListeners = Array<KeyboardKeyListener>();
  private upListeners = Array<KeyboardKeyListener>();

  constructor()
  {
    window.addEventListener("keydown", x => this.keyDownHandler(x));
    window.addEventListener("keyup", x => this.keyUpHandler(x));
  }

  keyDownHandler(keyboardEvent:KeyboardEvent)
  {
    var key = keyboardEvent.keyCode;
    var eventsForKey = this.downListeners.filter(l => l.keyCode == key);
    eventsForKey.forEach(l => l.cb());
  }

  keyUpHandler(keyboardEvent: KeyboardEvent)
  {
    var key = keyboardEvent.keyCode;
    var eventsForKey = this.upListeners.filter(l => l.keyCode == key);
    eventsForKey.forEach(l => l.cb());
  }

  public onKeydown(keyCode:number, cb:Function):void
  {
    var listener = new KeyboardKeyListener(keyCode, cb);
    this.downListeners.push(listener);
  }

  public onKeyup(keyCode:number, cb:Function):void
  {
    var listener = new KeyboardKeyListener(keyCode, cb);
    this.upListeners.push(listener);
  }
}

export = new KeyboardEvents();
