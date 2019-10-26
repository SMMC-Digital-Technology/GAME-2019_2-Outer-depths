var menuState = {
  create: function() {
    game.stars = this.add.group();
    game.levelData = JSON.parse(game.cache.getText('startScreen'));
    game.levelData.starLocations.forEach(function(element) {
      game.stars.create(element.x, element.y, element.image);
    }, this);

    gameTitle = game.add.sprite(0, 0, 'gameTitle');
    promptText = game.add.sprite(400, 500, 'prompt');
    fade = game.add.sprite(0, 0, 'pix');
    gameTitle.scale.setTo(3);
    gameTitle.smoothed = false;

    game.stars.scale.setTo(3);
    game.stars.setAll('smoothed', false);

    promptText.scale.setTo(3);
    promptText.smoothed = false;
    promptText.anchor.setTo(0.5);

    fade.scale.setTo(800, 600);
    fade.alpha = 0;

    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    game.time.events.add(Phaser.Timer.SECOND * 2, this.allowStartFnc, this);
    var allowStart = 0;


  },

  update: function() {
    if (this.allowStart && enter.isDown) {
      this.allowStart = 0;
      game.add.tween(fade).to({
        alpha: 1
      }, 2000, Phaser.Easing.Linear.None, true);
      game.time.events.add(Phaser.Timer.SECOND * 3, this.startGame, this);
    }
  },
  allowStartFnc: function() {
    this.allowStart = 1;
  },
  startGame: function() {
    game.state.start('hub');
  }

};