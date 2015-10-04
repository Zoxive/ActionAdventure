import keyboardEvents = require("./keyboard.ts");

enum PawnDirection
{
  up,
  down,
  right,
  left
}

class PawnAnimationDict
{
  [direction:number]: PIXI.extras.MovieClip;
}

class PawnAnimation extends PIXI.Container
{
  currentDirection:PawnDirection;
  currentMovie:PIXI.extras.MovieClip;

  animations:PawnAnimationDict;

  constructor(direction:PawnDirection, upFrames:PIXI.Texture[], downFrames:PIXI.Texture[], rightFrames:PIXI.Texture[], leftFrames:PIXI.Texture[])
  {
    super();

    this.currentDirection = direction;
    this.animations = new PawnAnimationDict();

    this.animations[PawnDirection.up] = this.createSpriteClip(upFrames);
    this.animations[PawnDirection.down] = this.createSpriteClip(downFrames);
    this.animations[PawnDirection.right] = this.createSpriteClip(rightFrames);
    this.animations[PawnDirection.left] = this.createSpriteClip(leftFrames);

    this.currentMovie = this.animations[direction];
    this.currentMovie.visible = true;
  }

  createSpriteClip(frames:PIXI.Texture[]):PIXI.extras.MovieClip
  {
    var clip = new PIXI.extras.MovieClip(frames);

    this.addChild(clip);

    clip.visible = false;
    clip.animationSpeed = 0.15;

    return clip;
  }

  play(direction:PawnDirection = this.currentDirection)
  {
    if (this.currentDirection != direction)
    {
      this.currentMovie.visible = false;
      if (this.currentMovie.playing)
      {
        this.currentMovie.stop();
      }
    }

    this.currentDirection = direction;

    this.currentMovie = this.animations[direction];
    this.currentMovie.visible = true;
    if (!this.currentMovie.playing)
      this.currentMovie.play();
  }

  stop()
  {
    if (this.currentMovie.playing)
      this.currentMovie.stop();
  }
}

class Pawn extends PIXI.Container
{
  private vx:number = 0;
  private vy:number = 0;
  private direction:PawnDirection = PawnDirection.up;

  private animation:PawnAnimation;

  constructor(hulk:any)
  {
    super();

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

    this.animation = new PawnAnimation(this.direction, upFrames, downFrames, rightFrames, leftFrames);

    this.addChild(this.animation);

    var speed = 3;

    // LEFT
    keyboardEvents.onKeydown(37, () =>
    {
      this.vx = -1 * speed;
      this.changeDirection(PawnDirection.left);
    });
    keyboardEvents.onKeyup(37, () =>
    {
      this.vx = 0;
    });

    // RIGHT
    keyboardEvents.onKeydown(39, () =>
    {
      this.vx = 1 * speed;
      this.changeDirection(PawnDirection.right);
    });

    keyboardEvents.onKeyup(39, () =>
    {
      this.vx = 0;
    });

    // UP
    keyboardEvents.onKeydown(38, () =>
    {
      this.vy = -1 * speed;
      this.changeDirection(PawnDirection.up);
    });
    keyboardEvents.onKeyup(38, () =>
    {
      this.vy = 0;
    });

    // DOWN
    keyboardEvents.onKeydown(40, () =>
    {
      this.vy = 1 * speed;
      this.changeDirection(PawnDirection.down);
    });
    keyboardEvents.onKeyup(40, () =>
    {
      this.vy = 0;
    });
  }

  changeDirection(direction:PawnDirection)
  {
    this.direction = direction;
  }

  render()
  {
    this.x += this.vx;
    this.y += this.vy;

    var noMovement = this.vx == 0 && this.vy == 0;
    if (noMovement)
      this.animation.stop();
    else
      this.animation.play(this.direction);
  }
}

export = Pawn;
