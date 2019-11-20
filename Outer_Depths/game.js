 meteorFnc = function(game, gameMode) {

   Phaser.Sprite.call(this, game, (Math.random() * 950 + 100), -20, );
   this.meteor = game.meteors.create(this.x, this.y, 'stars');
   this.meteor.anchor.set(0.5);
   this.meteor.scale.setTo(3);
   this.meteor.frame = 3;
   this.meteor.smoothed = false;
   game.physics.enable(this);

   this.body.velocity.x = -200;
   this.body.velocity.y = 320;

   game.add.existing(this);
 };
 meteorFnc.prototype = Object.create(Phaser.Sprite.prototype);
 meteorFnc.prototype.constructor = meteorFnc;

 meteorFnc.prototype.update = function() {

   if (this.meteor.x < -120 || this.meteor.y > 720 || gameMode != 1) {
     this.meteor.destroy();
     this.destroy();
   }
   this.meteor.x = this.x;
   this.meteor.y = this.y;
 };

 doorBlueFnc = function(game, wrench, doorX, doorY, panelX, panelY) {

   Phaser.Sprite.call(this, game, doorX, doorY, );
   this.door = game.doorLayer.create(this.x, this.y, 'doorBlue');
   this.door.scale.setTo(3);
   this.door.smoothed = false;
   game.physics.arcade.enable(this.door);
   this.door.body.immovable = true;


   this.panel = game.doorLayer.create(panelX, panelY, 'panel');
   this.panel.scale.setTo(3);
   this.panel.smoothed = false;
   game.physics.p2.enable([this.panel], true);
   this.panel.anchor.setTo(0);
   this.panel.body.setRectangle(100, 90, 42, 32, 0);
   this.panel.body.static = true;

   this.doorOpen = false;
   game.add.existing(this);
 };
 doorBlueFnc.prototype = Object.create(Phaser.Sprite.prototype);
 doorBlueFnc.prototype.constructor = doorBlueFnc;

 doorBlueFnc.prototype.update = function() {
   if (this.panel.frame == 1 && this.doorOpen == false) {
     this.doorOpen = true;
     game.add.tween(this.door).to({
       y: '-150'
     }, 2000, Phaser.Easing.Linear.None, true);
   }

 };

 var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-world', {
   preload: preload,
   create: create,
   update: update,
   render: render
 });

 var gameMode = 1;
 var swing = 0
 var mouse1down;
 var spaceTimer = 0;
 var jumping = false;
 var level1CollisionX = [1600, 21, 69, 9, 15, 1056, 24, 12, 12, 12, 800, 12, 12, 12, 12, 12, 12, 12, 12, 12, 100, 950, 30, 75, 100, 30, 159, 260, 75, 40, 120, 159, 200, 250, 40];
 var level1CollisionY = [100, 100, 60, 36, 400, 39, 162, 12, 12, 12, 200, 12, 12, 12, 12, 12, 12, 12, 12, 12, 183, 20, 200, 112, 70, 500, 210, 200, 100, 700, 24, 24, 30, 30, 50];
 var level2CollisionX = [123, 1000, 15, 1200];
 var level2CollisionY = [200, 200, 400, 53];
 var level1Data = [];
 var arrayDummy = 0;
 var activeLevel = 0;
 var transition = 0;
 var transitionYDummy;
 var transitionXDummy;

 function preload() {
   loadingLabel = game.add.text(80, 150, 'loading...', {
     font: '30px Courier',
     fill: '#ffffff'
   });
   game.load.text('startScreen', 'levelData/startScreen.json');
   game.load.text('bathroomLevel', 'levelData/bathroomLevel.json');
   game.load.text('Level2JSON', 'levelData/level2.json');

   game.load.image('pixel', 'assets/misc/pixel.png');

   game.load.spritesheet('player', 'assets/player/run.png', 32, 33);
   game.load.spritesheet('peaShooter', 'assets/weapons/shooter.png', 32, 32);
   game.load.spritesheet('wrench', 'assets/weapons/wrench.png', 43, 43);
   game.load.image('floor', 'assets/floor.png');
   game.load.image('yellow', 'assets/yellow.png');
   //  game.load.text('level1', 'assets/greenWall/walls.json');

   game.load.image('gameTitle', 'assets/title/game.png');
   game.load.image('prompt', 'assets/title/prompt.png');
   game.load.image('ventDoor', 'assets/environments/bathroom/ventDoor.png');
   game.load.image('doorBlue', 'assets/environments/doors/doorBlue.png');
   game.load.atlasJSONHash('stars', 'assets/title/stars/stars.png', 'assets/atlasData/stars.json');
   game.load.atlasJSONHash('bathroomSprites', 'assets/environments/bathroom/bathroom.png', 'assets/atlasData/bathroom.json');
   game.load.atlasJSONHash('panel', 'assets/environments/doors/panel.png', 'assets/atlasData/panel.json');
   game.load.atlasJSONHash('level2(1)', 'assets/environments/level2/level2(1).png', 'assets/atlasData/level2(1).json');
   game.load.atlasJSONHash('droid', 'assets/enemies/droid.png', 'assets/atlasData/droid.json');



 }

 function create() {
   game.physics.startSystem(Phaser.Physics.P2JS);
   game.physics.p2.setPostBroadphaseCallback(hitboxCheck, this, 1);

   loadingLabel.kill();
   game.stars1 = this.add.group();
   game.stars2 = this.add.group();
   game.levelData = JSON.parse(game.cache.getText('startScreen'));
   game.levelData.largeStarLocations.forEach(function(element) {
     game.stars1.create(element.x, element.y, element.image);
   });
   JSONLoad(game, game.stars1, 0);

   game.levelData = JSON.parse(game.cache.getText('startScreen'));
   game.levelData.smallStarLocations.forEach(function(element) {
     game.stars2.create(element.x, element.y, element.image);
   });
   JSONLoad(game, game.stars2, 1);

   game.meteors = game.add.group();
   game.titleGroup = game.add.group();

   game.backgroundLayer = game.add.group();
   game.doorLayer = game.add.group();
   game.mainLayer = game.add.group();
   game.collisionLayer = game.add.group();
   game.playerLayer = game.add.group();
   game.enemies = game.add.group();
   game.weapons = game.add.group();
   game.foregroundLayer = game.add.group();

   game.physics.arcade.enable(game.collisionLayer);
   game.collisionLayer.enableBody = true;
   game.collisionLayer.alpha = 0;
   game.collisionLayer.allowRotation = true;

   var gameTitle = game.titleGroup.create(0, 0, 'gameTitle');
   var promptText = game.titleGroup.create(400, 500, 'prompt');
   fade = game.add.sprite(0, 0, 'pixel');
   gameTitle.scale.setTo(3);
   gameTitle.smoothed = false;


   game.stars2.callAll('animations.add', 'animations', 'twinkle', [1, 2], 4, true, );
   game.stars2.callAll('play', null, 'twinkle');


   promptText.scale.setTo(3);
   promptText.smoothed = false;
   promptText.anchor.setTo(0.5);

   fade.scale.setTo(800, 600);
   fade.alpha = 0;

   enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
   A = game.input.keyboard.addKey(Phaser.Keyboard.A);
   S = game.input.keyboard.addKey(Phaser.Keyboard.S);
   D = game.input.keyboard.addKey(Phaser.Keyboard.D);
   space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   game.time.events.add(Phaser.Timer.SECOND * 0.1, allowStartFnc, this);
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
   if (gameMode == 2) {
     game.physics.arcade.collide(player, game.collisionLayer);
     game.physics.arcade.collide(player, game.doorLayer);

     if (player.body.velocity.x > 0) {
       player.body.velocity.x -= 20;
     } else if (player.body.velocity.x < 0) {
       player.body.velocity.x += 20;
     }

     if ((A.isDown || D.isDown) && transition == 0) {
       player.animations.play('run');
       if (A.isDown) {
         player.body.velocity.x = -200;

       } else if (D.isDown) {
         player.body.velocity.x = 200;
       }
     } else {
       player.animations.stop('run');
       player.frame = 0;
     }
     if (space.isDown && player.body.touching.down) {
       jumping = true;
       spaceTimer = -60;

     }
     camera.x = player.x;
     camera.y = player.y - 125;

     wrench.body.y = player.y;

     if (player.x - (this.input.mousePointer.x + this.camera.x) > 0) {
       wrench.scale.setTo(3, -3);
       player.scale.setTo(-3, 3);
       wrench.body.x = player.x - 6;

     } else {
       wrench.scale.setTo(3);
       player.scale.setTo(3);
       wrench.body.x = player.x + 6;

     }

     if (swing == 1) {
       if (player.x - (this.input.mousePointer.x + camera.x) > 0) {
         wrench.body.rotation = Phaser.Math.angleBetween(player.position.x, wrench.body.y, this.input.mousePointer.x + this.camera.x, this.input.mousePointer.y + this.camera.y) - (wrench.frame * 70) / 360 + 1;
       } else {
         wrench.body.rotation = Phaser.Math.angleBetween(player.position.x, wrench.body.y, this.input.mousePointer.x + this.camera.x, this.input.mousePointer.y + this.camera.y) + (wrench.frame * 70) / 360 - 1;
       }
     } else {
       wrench.body.rotation = Phaser.Math.angleBetween(player.position.x, wrench.body.y, this.input.mousePointer.x + this.camera.x, this.input.mousePointer.y + this.camera.y);
     }

     if (game.input.activePointer.leftButton.isDown && mouse1down == 0) {
       swingAnim = wrench.animations.play('swing');
       swing = 1;
       swingAnim.onComplete.add(swingComplete);
     }
     if (space.isDown) {
       spaceDown = 1;
       if (jumping && spaceTimer < 0) {
         spaceTimer -= 25;
         if (spaceTimer >= -100 && jumping) {
           player.body.velocity.y = spaceTimer;
         }
       }
     } else {
       spaceDown = 0;
       spaceTimer = 0;
       jumping = false;
     }
     if (spaceTimer <= -600) {
       spaceDown = 0;
       jumping = false;
       spaceTimer = 0;
     } else if (spaceTimer <= -100 && jumping) {
       player.body.velocity.y = -400;
     }

     if (player.body.touching.down == false && jumping == false && transition == 0) {
       player.body.velocity.y += 15;
     }

     if (activeLevel == 1 && player.y < 0) {
       game.backgroundLayer.callAll('kill');
       game.doorLayer.callAll('kill');
       game.mainLayer.callAll('kill');
       game.doorLayer.callAll('kill');
       game.collisionLayer.callAll('kill');
       game.foregroundLayer.callAll('kill');

       loadLevel2();
       transition = 1;
       player.x = 210;
       player.y = game.world.height - 20;
       player.body.velocity.y = -300;
       transitionXDummy = player.x;
       transitionYDummy = player.y;
     }

     if (transition == 1) {
       if ((player.y > transitionYDummy - 150) && (player.x == transitionXDummy)) {
         player.body.velocity.y -= 16;
       } else {
         if (player.x == transitionXDummy) {
           player.body.velocity.x = 16;
         } else {
           player.body.velocity.x += 35;
           player.body.velocity.y += 16;
         }

       }
       if (player.body.touching.down) {
         transition = 0;
         player.body.velocity.x = 0;
         player.body.velocity.y = 0;
       }
     }


     if (game.input.activePointer.leftButton.isDown) {
       mouse1down = 1;
       console.log((this.input.mousePointer.x + this.camera.x) + " - " + (this.input.mousePointer.y + this.camera.y));
     } else {
       mouse1down = 0;
     }
   }
 }

 function allowStartFnc() {
   this.allowStart = 1;
 }

 function launchMeteor() {
   if (gameMode == 1) {
     game.time.events.add(Phaser.Timer.SECOND * (Math.random() * 3), launchMeteor, this);
     new meteorFnc(game, gameMode);
   }
 }

 function startGame() {
   game.meteors.callAll('kill');
   game.stars1.callAll('kill');
   game.stars2.callAll('kill');




   game.titleGroup.callAll('kill');


   gameMode = 2;

   loadingLabel = game.add.text(80, 150, 'loading...', {
     font: '30px Courier',
     fill: '#ffffff'
   });

   player = game.add.sprite(800, 600, 'player');
   wrench = game.add.sprite(800, 600, 'wrench');
   camera = game.add.sprite(400, 300);

   game.camera.follow(camera, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
   game.camera.x = 800;
   game.camera.x = 600;
   player.frame = 0;
   player.scale.setTo(3);
   player.anchor.setTo(0.5);
   player.smoothed = false;
   game.physics.arcade.enable(player);
   player.body.gravity.y = 500;
   player.body.setSize(24, 32, 4, 1);

   player.animations.add('run', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);

   game.physics.p2.enable([wrench], true);
   wrench.anchor.setTo(.15, .5);
   wrench.smoothed = false;
   wrench.scale.setTo(3);
   wrench.visible = true;
   wrench.frame = 1;
   wrench.body.setRectangle(60, 90, 80, 0, 0);


   wrench.animations.add('swing', [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1], 30, false);

   loadLevel1();

   game.add.tween(fade).to({
     alpha: 0
   }, 2000, Phaser.Easing.Linear.None, true);
   loadingLabel.kill();
 }


 function JSONLoad(game, groupName, spriteFrames) {
   groupName.scale.set(3);
   groupName.setAll('smoothed', false);
   groupName.setAll('frame', spriteFrames);
 }

 function swingComplete() {
   swing = 0;
 }

 function arrayDummyAdd(element) {
   arrayDummy = arrayDummy + 1;
 }

 function hitboxCheck(body1, body2) {
   if (((body1.sprite.key === 'wrench' && body2.sprite.key === 'panel') || (body2.sprite.key === 'wrench' && body1.sprite.key === 'panel')) && swing == 1) {
     if (body2.sprite.key === 'panel') {
       body2.sprite.frame = 1;
     } else {
       body1.sprite.frame = 1;
     }
   }
   console.log(swing);
   return false;

 }

 function render() {
   if (gameMode == 2) {
     game.debug.body(player);
     game.debug.physicsGroup(game.collisionLayer);
     game.debug.physicsGroup(game.doorLayer);
   }
 }

 function loadLevel1() {
   game.world.setBounds(0, 0, 2300, 900);

   game.levelData = JSON.parse(game.cache.getText('bathroomLevel'));
   game.levelData.bathroomBackground.forEach(function(element) {
     game.backgroundLayer.create(element.x, element.y, element.image);
   });
   JSONLoad(game, game.backgroundLayer, 1);

   game.levelData.bathroomMain.forEach(function(element) {
     game.mainLayer.create(element.x, element.y, element.image)
   }, this);
   JSONLoad(game, game.mainLayer, 0);

   game.levelData.bathroomCollision.forEach(function(element, arrayDummy) {
     arrayDummyAdd();
     colBox = game.collisionLayer.create(element.x, element.y, element.image);
     colBox.scale.setTo(level1CollisionX[arrayDummy], level1CollisionY[arrayDummy]);
     colBox.body.immovable = true;
     colBox.anchor.setTo(0);
   });
   arrayDummy = 0;

   ventDoor = game.doorLayer.create(156, 516, 'ventDoor');
   ventDoor.frame = 0;
   ventDoor.scale.setTo(3);
   ventDoor.smoothed = false;
   ventDoor.anchor.setTo(1);
   //game.physics.arcade.enable(ventDoor);
   //ventDoor.body.immovable = true;

   new doorBlueFnc(game, wrench, 1010, 412, 950, 210);

   activeLevel = 1;
 }

 function loadLevel2() {
   game.world.setBounds(0, 0, 6000, 6000);

   game.levelData = JSON.parse(game.cache.getText('Level2JSON'));

   game.levelData.level2Main.forEach(function(element) {
     game.backgroundLayer.create(element.x, element.y, element.image);
   });
   JSONLoad(game, game.backgroundLayer, 1);

   game.levelData.level2Main.forEach(function(element) {
     game.mainLayer.create(element.x, element.y, element.image)
   }, this);
   JSONLoad(game, game.mainLayer, 0);
   console.log(arrayDummy);
   game.levelData.level2Collision.forEach(function(element, arrayDummy) {
     arrayDummyAdd();
     colBox = game.collisionLayer.create(element.x, element.y, element.image);
     colBox.scale.setTo(level2CollisionX[arrayDummy], level2CollisionY[arrayDummy]);
     colBox.body.immovable = true;
     colBox.anchor.setTo(0);

     console.log(arrayDummy);
   });
   arrayDummy = 0;
 }