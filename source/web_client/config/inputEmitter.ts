/// <reference path="../../../typings/tsd.d.ts" />

import keyboardmaster = require("keymaster");
import events = require("events");
import IInputDictionary = require("./IInputDictionary");

import keys = require("./keys.ts");
import mouse = require("./mouse.ts");

class InputEmitter extends events.EventEmitter
{
  constructor(keys:IInputDictionary, mouse:IInputDictionary)
  {
    super();

    for(var key in keys)
    {
      this.registerKey(key, keys[key]);
    }

    for (var button in mouse)
    {
      this.registerButton(button, mouse[button]);
    }
  }

  private registerButton(button: string, map: string)
  {
    document.addEventListener(button, (e:MouseEvent) =>
    {
      this.buttonCalled(button, map, e);
    });
  }

  private registerKey(key:string, map:string)
  {
    keyboardmaster(map, (e:KeyboardEvent) =>
    {
      this.keyCalled(key, map, e);
    });
  }

  private buttonCalled(button: string, map: string, mouseEvent: MouseEvent)
  {
    this.emit(button, mouseEvent);
  }

  private keyCalled(key:string, map:string, e:KeyboardEvent)
  {
    this.emit(key, e);
  }
}

export = new InputEmitter(keys, mouse);
