meteorFnc = function(game) {

  Phaser.Sprite.call(this, game, (Math.random() * 950 + 100), -20, );
  this.meteor = game.meteors.create(this.x, this.y, 'stars');
  this.meteor.anchor.set(0.5);
  this.meteor.scale.setTo(3);
  this.meteor.frame = 3;
  game.physics.enable(this);

  this.body.velocity.x = -200;
  this.body.velocity.y = 320;

  game.add.existing(this);
};
meteorFnc.prototype = Object.create(Phaser.Sprite.prototype);
meteorFnc.prototype.constructor = meteorFnc;

meteorFnc.prototype.update = function() {

  if (this.meteor.x < -120 || this.meteor.y > 720) {
    this.meteor.destroy();
    this.destroy();
  }
  this.meteor.x = this.x;
  this.meteor.y = this.y;
  console.log(this.meteor.x);
};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-world', {
  preload: preload,
  create: create,
  update: update
});

function preload() {
  loadingLabel = game.add.text(80, 150, 'loading...', {
    font: '30px Courier',
    fill: '#ffffff'
  });
  game.load.text('startScreen', 'data/startScreen.json');

  game.load.image('pix', 'assets/misc/pix.png');

  game.load.spritesheet('player', 'assets/player/run.png', 32, 33);
  game.load.spritesheet('peaShooter', 'assets/weapons/shooter.png', 32, 32);
  game.load.spritesheet('wrench', 'assets/weapons/wrench.png', 43, 43);
  game.load.image('floor', 'assets/floor.png');
  game.load.image('bathroom', 'assets/bathroom.png');
  game.load.image('yellow', 'assets/yellow.png');
  //  game.load.text('level1', 'assets/greenWall/walls.json');

  game.load.image('gameTitle', 'assets/title/game.png');
  game.load.image('prompt', 'assets/title/prompt.png');
  game.load.atlasJSONHash('stars', 'assets/title/stars/stars.png', 'assets/data/stars.json');



}

function create() {
  game.stars1 = this.add.group();
  game.levelData = JSON.parse(game.cache.getText('startScreen'));
  game.levelData.largeStarLocations.forEach(function(element) {
    game.stars1.create(element.x, element.y, element.image);
  }, this);

  game.stars2 = this.add.group();
  game.levelData = JSON.parse(game.cache.getText('startScreen'));
  game.levelData.smallStarLocations.forEach(function(element) {
    game.stars2.create(element.x, element.y, element.image);
  }, this);

  game.meteors = game.add.group();
  var titleGroup = game.add.group();

  var gameTitle = titleGroup.create(0, 0, 'gameTitle');
  var promptText = titleGroup.create(400, 500, 'prompt');
  fade = game.add.sprite(0, 0, 'pix');
  gameTitle.scale.setTo(3);
  gameTitle.smoothed = false;

  game.stars1.scale.setTo(3);
  game.stars1.setAll('smoothed', false);
  game.stars1.setAll('frame', 0);

  game.stars2.scale.setTo(3);
  game.stars2.setAll('smoothed', false);
  game.stars2.setAll('frame', 1);

  game.stars2.callAll('animations.add', 'animations', 'twinkle', [1, 2], 4, true, );
  game.stars2.callAll('play', null, 'twinkle');


  promptText.scale.setTo(3);
  promptText.smoothed = false;
  promptText.anchor.setTo(0.5);

  fade.scale.setTo(800, 600);
  fade.alpha = 0;

  enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  game.time.events.add(Phaser.Timer.SECOND * 2, allowStartFnc, this);
  var allowStart = 0;
  game.time.events.add(Phaser.Timer.SECOND * (Math.random() * 2), launchMeteor, this);
}

function update() {
  if (this.allowStart && enter.isDown) {
    this.allowStart = 0;
    game.add.tween(fade).to({
      alpha: 1
    }, 2000, Phaser.Easing.Linear.None, true);
    game.time.events.add(Phaser.Timer.SECOND * 2, startGame, this);
  }
}

function allowStartFnc() {
  this.allowStart = 1;
}

function launchMeteor() {
  game.time.events.add(Phaser.Timer.SECOND * (Math.random() * 3), launchMeteor, this);
  new meteorFnc(game);
}

function startGame() {

}