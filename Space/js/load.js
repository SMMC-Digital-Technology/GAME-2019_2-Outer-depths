var loadState = {
  preload: function() {
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



  },

  create: function() {
    game.state.start('menu');
  }

};