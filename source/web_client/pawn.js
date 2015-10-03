var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var keyboardEvents = require("./keyboard.ts");
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn(hulk) {
        var _this = this;
        _super.call(this);
        this.vx = 0;
        this.vy = 0;
        var pawnTexture = hulk.textures["12.png"];
        var upFrames = [];
        upFrames.push(hulk.textures["12.png"]);
        upFrames.push(hulk.textures["13.png"]);
        upFrames.push(hulk.textures["14.png"]);
        upFrames.push(hulk.textures["15.png"]);
        var upMovie = new PIXI.extras.MovieClip(upFrames);
        upMovie.animationSpeed = 0.15;
        var downFrames = [];
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
        var leftMovie = upMovie;
        var rightMovie = upMovie;
        keyboardEvents.onKeydown(37, function () {
            _this.vx = -1 * speed;
            _this.changeMovie(leftMovie);
        });
        keyboardEvents.onKeyup(37, function () {
            _this.vx = 0;
            _this.currentMovie.stop();
        });
        keyboardEvents.onKeydown(39, function () {
            _this.vx = 1 * speed;
            _this.changeMovie(rightMovie);
        });
        keyboardEvents.onKeyup(39, function () {
            _this.vx = 0;
            _this.currentMovie.stop();
        });
        keyboardEvents.onKeydown(38, function () {
            _this.vy = -1 * speed;
            _this.changeMovie(upMovie);
        });
        keyboardEvents.onKeyup(38, function () {
            _this.vy = 0;
            _this.currentMovie.stop();
        });
        keyboardEvents.onKeydown(40, function () {
            _this.vy = 1 * speed;
            _this.changeMovie(downMovie);
        });
        keyboardEvents.onKeyup(40, function () {
            _this.vy = 0;
            _this.currentMovie.stop();
        });
    }
    Pawn.prototype.changeMovie = function (newMovie) {
        this.currentMovie.stop();
        this.currentMovie.visible = false;
        this.currentMovie = newMovie;
        this.currentMovie.visible = true;
        this.currentMovie.play();
    };
    Pawn.prototype.render = function () {
        this.x += this.vx;
        this.y += this.vy;
    };
    return Pawn;
})(PIXI.Container);
module.exports = Pawn;
//# sourceMappingURL=pawn.js.map