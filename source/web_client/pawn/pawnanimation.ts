import CharacterDirection = require("../character/characterdirection.ts");

class PawnAnimationDict
{
  [direction:number]: PIXI.extras.MovieClip;
}

class PawnAnimation extends PIXI.Container
{
  currentDirection:CharacterDirection;
  currentMovie:PIXI.extras.MovieClip;

  animations:PawnAnimationDict;

  constructor(direction:CharacterDirection, upFrames:PIXI.Texture[], downFrames:PIXI.Texture[], rightFrames:PIXI.Texture[], leftFrames:PIXI.Texture[])
  {
    super();

    this.currentDirection = direction;
    this.animations = new PawnAnimationDict();

    this.animations[CharacterDirection.up] = this.createSpriteClip(upFrames);
    this.animations[CharacterDirection.down] = this.createSpriteClip(downFrames);
    this.animations[CharacterDirection.right] = this.createSpriteClip(rightFrames);
    this.animations[CharacterDirection.left] = this.createSpriteClip(leftFrames);

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

  play(direction?:CharacterDirection)
  {
    if (direction == null) direction = this.currentDirection

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

export = PawnAnimation;
