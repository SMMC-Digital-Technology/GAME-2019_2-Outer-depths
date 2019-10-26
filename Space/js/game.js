var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-world');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
//game.state.add('level', levelState);
game.state.add('hub', hubState);

game.global = {
  swing: 0,
  mouese2: 0,
  moving: 0,
  dustx: 0,
  dusty: 0,
  dustBuffer: 0,
  Mouse1Down: 0,
  swordFreeze: 0,
  moveFreeze: 0,
  player: 0,
  floor: 0,
  allowStart: 0
};

game.state.start('boot');