var loadState = {
  preload: function() {
    loadingLabel = game.add.text(80, 150, 'loading...', {
      font: '30px Courier',
      fill: '#ffffff'
    });

    game.load.spritesheet('player', 'assets/player/run.png', 32, 33);
    game.load.spritesheet('peaShooter', 'assets/weapons/shooter.png', 32, 32);
    game.load.spritesheet('wrench', 'assets/weapons/wrench.png', 43, 43);
    game.load.image('floor', 'assets/floor.png');
    game.load.image('bathroom', 'assets/bathroom.png');
    game.load.image('yellow', 'assets/yellow.png');
    //  game.load.text('level1', 'assets/greenWall/walls.json');

    game.load.image('gameTitle', 'assets/title/game.png');
    game.load.image('prompt', 'assets/title/prompt.png');
    game.load.image('largeStar', 'assets/title/stars/stars_0.png');
    game.load.image('smallStar1', 'assets/title/stars/stars_1.png');
    game.load.image('smallStar2', 'assets/title/stars/stars_2.png');
    game.load.image('meteor1', 'assets/title/stars/stars_3.png');
    game.load.image('meteor2', 'assets/title/stars/stars_4.png');


  },

  create: function() {
    game.state.start('menu');
  }

};