/// <reference path="../../typings/tsd.d.ts" />

import PIXI = require("pixi.js");

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(500, 500, { antialias: true, transparent: true, resolution: 1, autoResize: true });

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";

document.getElementById("app")
  .appendChild(renderer.view);

//
//
PIXI.loader
  .add("hulk", "assets/hulk.json")
  .load(setup);

function setup(loader, resources)
{
  var hulk = resources.hulk;
  var pawnTexture = hulk.textures["12.png"];

  var frames = [];
  frames.push(hulk.textures["12.png"]);
  frames.push(hulk.textures["13.png"]);
  frames.push(hulk.textures["14.png"]);
  frames.push(hulk.textures["15.png"]);

  var movie = new PIXI.extras.MovieClip(frames);
  movie.animationSpeed = 0.15;
  //movie.play();

  stage.addChild(movie);

  render();
}

function render()
{
  renderer.render(stage);

  requestAnimationFrame(render);
}
