var menuState = {
  create: function() {
    gameTitle = game.add.sprite(0, 0, 'gameTitle');
    promptText = game.add.sprite(400, 500, 'prompt');
    gameTitle.scale.setTo(3);
    gameTitle.smoothed = false;

    promptText.scale.setTo(3);
    promptText.smoothed = false;
    promptText.anchor.setTo(0.5);


    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    game.time.events.add(Phaser.Timer.SECOND * 2, this.allowStartFnc, this);
    var allowStart = 0;


  },

  update: function() {
    if (this.allowStart && enter.isDown) {
      console.log("2");
      game.state.start('hub');
    }
  },
  allowStartFnc: function() {
    this.allowStart = 1;
    console.log("1");
  }
};