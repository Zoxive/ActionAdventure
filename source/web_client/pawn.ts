import keyboardEvents = require("./keyboard.ts");

class Pawn extends PIXI.Container
{
  private vx:number = 0;
  private vy:number = 0;

  private currentMovie:PIXI.extras.MovieClip;

  constructor(hulk:any)
  {
    super();

    var pawnTexture = hulk.textures["12.png"];

    var upFrames:PIXI.Texture[] = [];
    upFrames.push(hulk.textures["12.png"]);
    upFrames.push(hulk.textures["13.png"]);
    upFrames.push(hulk.textures["14.png"]);
    upFrames.push(hulk.textures["15.png"]);

    var upMovie = new PIXI.extras.MovieClip(upFrames);
    upMovie.animationSpeed = 0.15;

    var downFrames:PIXI.Texture[] = [];
    upFrames.push(hulk.textures["0.png"]);
    upFrames.push(hulk.textures["1.png"]);
    upFrames.push(hulk.textures["2.png"]);
    upFrames.push(hulk.textures["3.png"]);

    var downMovie = new PIXI.extras.MovieClip(upFrames);
    downMovie.animationSpeed = 0.15;

    this.addChild(upMovie);
    this.addChild(downMovie);

    upMovie.visible = false;
    downMovie.visible = false;

    this.currentMovie = upMovie;
    this.currentMovie.visible = true;

    var speed = 5;

    // FAKE for now
    var leftMovie = upMovie;
    var rightMovie = upMovie;

    // LEFT
    keyboardEvents.onKeydown(37, () =>
    {
      this.vx = -1 * speed;
      this.changeMovie(leftMovie);
    });
    keyboardEvents.onKeyup(37, () =>
    {
      this.vx = 0;
      this.currentMovie.stop();
    });

    // RIGHT
    keyboardEvents.onKeydown(39, () =>
    {
      this.vx = 1 * speed;
      this.changeMovie(rightMovie);
    });

    keyboardEvents.onKeyup(39, () =>
    {
      this.vx = 0;
      this.currentMovie.stop();
    });

    // UP
    keyboardEvents.onKeydown(38, () =>
    {
      this.vy = -1 * speed;
      this.changeMovie(upMovie);
    });
    keyboardEvents.onKeyup(38, () =>
    {
      this.vy = 0;
      this.currentMovie.stop();
    });


    // DOWN
    keyboardEvents.onKeydown(40, () =>
    {
      this.vy = 1 * speed;
      this.changeMovie(downMovie);
    });
    keyboardEvents.onKeyup(40, () =>
    {
      this.vy = 0;
      this.currentMovie.stop();
    });
  }

  changeMovie(newMovie:PIXI.extras.MovieClip)
  {
    this.currentMovie.stop();
    this.currentMovie.visible = false;

    this.currentMovie = newMovie;
    this.currentMovie.visible = true;
    this.currentMovie.play();
  }

  render()
  {
    this.x += this.vx;
    this.y += this.vy;
  }
}

export = Pawn;
