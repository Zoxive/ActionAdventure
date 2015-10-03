/// <reference path="../../typings/tsd.d.ts" />

import PIXI = require("pixi.js");
import Pawn = require("./pawn.ts");

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(500, 500, { antialias: true, transparent: true, resolution: 1, autoResize: true });

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";

document.getElementById("app")
  .appendChild(renderer.view);

PIXI.loader
  .add("hulk", "assets/hulk.json")
  .load(setup);

var pawn:Pawn;

function setup(loader:PIXI.loaders.Loader, resources:any)
{
  var hulk = resources.hulk;

  pawn = new Pawn(hulk);

  stage.addChild(pawn);

  render();
}

function render()
{
  renderer.render(stage);

  pawn.render();

  requestAnimationFrame(render);
}
