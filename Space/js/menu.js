var menuState = {
  create: function() {
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

    gameTitle = game.add.sprite(0, 0, 'gameTitle');
    promptText = game.add.sprite(400, 500, 'prompt');
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

    game.time.events.add(Phaser.Timer.SECOND * 2, this.allowStartFnc, this);
    var allowStart = 0;
    game.time.events.add(Phaser.Timer.SECOND * (Math.random() * 15 + 1), this.launchMeteor, this);


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
  launchMeteor: function() {
    game.time.events.add(Phaser.Timer.SECOND * (Math.random() * 15 + 1), this.launchMeteor, this);

  },
  startGame: function() {
    game.state.start('hub');
  }

};