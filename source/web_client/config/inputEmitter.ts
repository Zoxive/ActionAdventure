/// <reference path="../../../typings/tsd.d.ts" />

import keyboardmaster = require("keymaster");
import events = require("events");
import IInputDictionary = require("./IInputDictionary");
import keys = require("./keys");
import mouse = require("./mouse");

class InputEmitter extends events.EventEmitter
{
  constructor(keys:IInputDictionary, mouse:IInputDictionary)
  {
    super();

    for(var key in keys)
    {
      this.registerKey(key, keys[key]);
    }

    // todo mouse
  }

  registerKey(key:string, map:string)
  {
    keyboardmaster(map, (e:KeyboardEvent) =>
    {
      this.keyCalled(key, map, e);
    });
  }

  keyCalled(key:string, map:string, e:KeyboardEvent)
  {
    this.emit(key, e);
  }
}

export = new InputEmitter(keys, mouse);
