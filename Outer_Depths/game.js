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

   Phaser.Sprite.call(this, game, doorX, doorY);
   this.door = game.doorLayer.create(this.x, this.y, 'doorBlue');
   this.door.scale.setTo(3);
   this.door.smoothed = false;
   game.physics.arcade.enable(this.door);
   this.door.body.immovable = true;


   this.panel = game.doorLayer.create(panelX, panelY, 'panel');
   this.panel.scale.setTo(3);
   this.panel.smoothed = false;
   game.physics.p2.enable([this.panel], false);
   this.panel.anchor.setTo(0);
   this.panel.body.setRectangle(100, 90, 42, 32, 0);
   this.panel.body.static = true;

   if (level1Data[0] == true) {
     this.doorOpen = true;
     this.panel.frame = 1;
     this.door.y -= 200;
   } else {
     this.doorOpen = false;
   }
   game.add.existing(this);
 };
 doorBlueFnc.prototype = Object.create(Phaser.Sprite.prototype);
 doorBlueFnc.prototype.constructor = doorBlueFnc;

 doorBlueFnc.prototype.update = function() {
   if (this.panel.frame == 1 && this.doorOpen == false) {
     level1Data[0] = true;
     this.doorOpen = true;
     game.add.tween(this.door).to({
       y: '-150'
     }, 2000, Phaser.Easing.Linear.None, true);
   }

 };
 healthFnc = function(game, healthX, healthY, healthNumber) {
   this.healthNumber = healthNumber
   Phaser.Sprite.call(this, game, 0, 0);
   this.health = game.hud.create(this.x + game.camera.x, this.y + game.camera.y, 'health');


   this.health.frame = 5;
   this.health.scale.setTo(3);
   this.health.anchor.setTo(0.5);
   this.health.smoothed = false;
   this.health.fixedToCamera = true;
   this.health.cameraOffset.setTo(healthX, healthY);

   game.add.existing(this);

 }
 healthFnc.prototype = Object.create(Phaser.Sprite.prototype);
 healthFnc.prototype.constructor = healthFnc;

 healthFnc.prototype.update = function() {
   if (playerHealth < (this.healthNumber + 1)) {
     this.health.frame = 6;
   } else {
     this.health.frame = 5;
   }
 }
 droidFnc = function(game, droidX, droidY, doPatrol, patrol1, patrol2, droidNumber) {
   Phaser.Sprite.call(this, game, droidX, droidY);

   this.droid = game.enemies.create(this.x, this.y, 'droid');
   this.droid.animations.add('flash', [0, 1], 2, true);
   this.droid.animations.play('flash');
   this.droid.scale.setTo(3);
   this.droid.smoothed = false;
   this.droid.anchor.setTo(0.5);
   game.physics.arcade.enable(this.droid);
   this.droid.body.immovable = false;
   this.droid.body.setSize(23, 34, 5, 0);
   this.droid.body.gravity.y = 160;

   this.jumpRightHB1 = game.enemies.create(0, 0, 'pixel');
   this.jumpRightHB1.scale.setTo(3);
   this.jumpRightHB1.anchor.setTo(0.5);
   this.jumpRightHB1.alpha = 0;
   game.physics.arcade.enable(this.jumpRightHB1);
   this.jumpRightHB1.body.immovable = true;
   this.jumpRightHB1.body.setSize(20, 10, 0, -16);

   this.jumpRightHB2 = game.enemies.create(0, 0, 'pixel');
   this.jumpRightHB2.scale.setTo(3);
   this.jumpRightHB2.anchor.setTo(0.5);
   this.jumpRightHB2.alpha = 0;
   game.physics.arcade.enable(this.jumpRightHB2);
   this.jumpRightHB2.body.immovable = true;
   this.jumpRightHB2.body.setSize(20, 24.5, 0, -6);

   this.jumpLeftHB1 = game.enemies.create(0, 0, 'pixel');
   this.jumpLeftHB1.scale.setTo(3);
   this.jumpLeftHB1.anchor.setTo(0.5);
   this.jumpLeftHB1.alpha = 0;
   game.physics.arcade.enable(this.jumpLeftHB1);
   this.jumpLeftHB1.body.immovable = true;
   this.jumpLeftHB1.body.setSize(20, 10, -20, -16);

   this.jumpLeftHB2 = game.enemies.create(0, 0, 'pixel');
   this.jumpLeftHB2.scale.setTo(3);
   this.jumpLeftHB2.anchor.setTo(0.5);
   this.jumpLeftHB2.alpha = 0;
   game.physics.arcade.enable(this.jumpLeftHB2);
   this.jumpLeftHB2.body.immovable = true;
   this.jumpLeftHB2.body.setSize(20, 24.5, -20, -6);

   this.droidHB = game.enemies.create(this.x, this.y, 'droid');
   this.droidHB.alpha = 0;
   game.physics.p2.enable([this.droidHB], false);
   this.droidHB.body.setRectangle(50, 50, 0, 0, 0);

   this.baton = game.enemies.create(this.x - 22, this.y + 7, 'baton');
   this.baton.animations.add('steady', [0, 1, 2], 20, false);
   this.baton.animations.add('swing', [3, 4, 5, 6, 7, 8, 9, 10, 11, 0], 20, false);
   this.baton.scale.setTo(3);
   this.baton.anchor.setTo(0.5);
   this.baton.smoothed = false;
   this.baton.alpha = 0.6;
   game.physics.p2.enable([this.baton], false);
   this.baton.body.setRectangle(70, 100, -65, 0, 0);
   this.fase = game.add.tween(this.baton).to({
     alpha: 0.3
   }, 500, Phaser.Easing.Linear.None, true, 0, -1);
   this.fase.yoyo(true, 0);

   this.droidNumber = droidNumber;
   this.seePlayer = false;
   droidAttackTimer[droidNumber] = 0;
   droidAttack[droidNumber] = 0;
   droidInvincibility[droidNumber] = 0;
   droidHealth[droidNumber] = 3;
   this.jump = false;

   game.physics.p2.setPostBroadphaseCallback(this.hitboxCheckDroidBaton, this, );

   game.add.existing(this);
 }
 droidFnc.prototype = Object.create(Phaser.Sprite.prototype);
 droidFnc.prototype.constructor = droidFnc;
 droidFnc.prototype.update = function() {

   droidNumber = this.droidNumber;

   if (activeLevel == 2) {
     this.game.physics.arcade.collide(game.collisionLayer, this.droid);
     this.cantJumpCheckRight = this.game.physics.arcade.overlap(game.collisionLayer, this.jumpRightHB1);
     this.canJumpCheckRight = this.game.physics.arcade.overlap(game.collisionLayer, this.jumpRightHB2);
     this.cantJumpCheckLeft = this.game.physics.arcade.overlap(game.collisionLayer, this.jumpLeftHB1);
     this.canJumpCheckLeft = this.game.physics.arcade.overlap(game.collisionLayer, this.jumpLeftHB2);

     if (droidAttack[droidNumber] == 0 && droidAttackTimer[droidNumber] > 0) {
       droidAttackTimer[droidNumber] -= 1;
     }

     if (droidInvincibility[droidNumber] > 0 && droidInvincibility[droidNumber] != 99) {
       droidInvincibility[droidNumber] -= 1;
       this.droid.alpha = 0.4;
     } else if (droidInvincibility[droidNumber] == 0) {
       this.droid.alpha = 1;
     }

     if (droidAttack[droidNumber] == 2 && droidAttackTimer[droidNumber] < 80) {
       droidAttackTimer[droidNumber] += 1;
     } else if (droidAttack[droidNumber] == 2) {
       droidAttack[droidNumber] = 3;
     }

     if (droidAttack[droidNumber] == 3 && droidAttackTimer[droidNumber] == 80 && Math.abs(this.droid.x - player.x) < 150 && player.y > (this.droid.y - 120) && player.y < (this.droid.y + 40)) {
       this.baton.animations.play('swing');
       droidAttackTimer[droidNumber] -= 3;
     } else if (droidAttack[droidNumber] == 3 && droidAttackTimer[droidNumber] < 79) {
       droidAttackTimer[droidNumber] -= 7;
     }

     if (droidAttackTimer[droidNumber] < -80) {
       droidAttackTimer[droidNumber] = 120;
       droidAttack[droidNumber] = 0;
     }

     if (player.x > (this.droid.x - 250) && player.x < (this.droid.x + 250) && player.y > (this.droid.y - 100) && player.y < (this.droid.y + 40) && droidAttack[droidNumber] == 1) {
       droidAttack[droidNumber] = 2;
       this.baton.animations.play('steady');
     }

     if (player.x > (this.droid.x - 400) && player.x < (this.droid.x + 400) && player.y > (this.droid.y - 450) && player.y < (this.droid.y + 350)) {
       this.seePlayer = true;
     }

     if (this.seePlayer == true && player.x > (this.droid.x - 650) && player.x < (this.droid.x + 650)) {
       if (player.x > this.droid.x) {
         if (droidAttack[droidNumber] == 0) {
           this.droid.body.velocity.x -= 15;
         } else {
           this.droid.body.velocity.x += 10;
         }
         this.baton.body.x = this.droid.x + 22;
         this.droid.scale.x = -3;
         if (this.baton.scale.x != -3) {
           this.baton.body.setRectangle(70, 100, 65, 0, 0);
         }
         this.baton.scale.x = -3;


       } else {
         if ((droidAttack[droidNumber] == 0 && Math.abs(this.droid.x - player.x) < 300) || Math.abs(this.droid.x - player.x) < 150) {
           this.droid.body.velocity.x += 15;
         } else {
           this.droid.body.velocity.x -= 10;
         }
         this.baton.body.x = this.droid.x - 22;
         this.droid.scale.x = 3;
         if (this.baton.scale.x != 3) {
           this.baton.body.setRectangle(70, 100, -65, 0, 0);
         }
         this.baton.scale.x = 3;

       }

       if (droidAttackTimer[droidNumber] == 0 && droidAttack[droidNumber] == 0) {
         droidAttack[droidNumber] = 1;
       }

       if ((droidAttack[droidNumber] == 0 && Math.abs(this.droid.x - player.x) < 300) || Math.abs(this.droid.x - player.x) < 200) {
         if (this.droid.body.velocity.x < -180) {
           this.droid.body.velocity.x = -180;
         } else if (this.droid.body.velocity.x > 180) {
           this.droid.body.velocity.x = 180;
         }
       } else {
         if (this.droid.body.velocity.x < -100) {
           this.droid.body.velocity.x = -100;
         } else if (this.droid.body.velocity.x > 100) {
           this.droid.body.velocity.x = 100;
         }
       }
       if (droidAttack[droidNumber] != 0) {
         this.baton.body.y = this.droid.y + 7 - (droidAttackTimer[droidNumber] / 4);
       } else {
         this.baton.body.y = this.droid.y + 7;
       }
     } else {
       this.seePlayer = false;
     }
     this.jumpRightHB1.x = this.droid.x + this.droid.body.velocity.x / 60;
     this.jumpRightHB1.y = this.droid.y + this.droid.body.velocity.y / 60;
     this.jumpRightHB2.x = this.droid.x + this.droid.body.velocity.x / 60;
     this.jumpRightHB2.y = this.droid.y + this.droid.body.velocity.y / 60;
     this.jumpLeftHB1.x = this.droid.x + this.droid.body.velocity.x / 60;
     this.jumpLeftHB1.y = this.droid.y + this.droid.body.velocity.y / 60;
     this.jumpLeftHB2.x = this.droid.x + this.droid.body.velocity.x / 60;
     this.jumpLeftHB2.y = this.droid.y + this.droid.body.velocity.y / 60;
     this.droidHB.body.x = this.droid.x + this.droid.body.velocity.x / 60;
     this.droidHB.body.y = this.droid.y + this.droid.body.velocity.y / 60;

     if (this.droid.body.velocity.x > 0 || this.droid.body.touching.right) {
       if (this.canJumpCheckRight && this.cantJumpCheckRight == false) {
         this.droid.body.velocity.y = -100;
         this.jump = true;
       } else {
         if (this.droid.body.touching.down == false) {
           this.droid.body.velocity.y = 200;
         }
         this.jump = false;
       }
     } else {
       if (this.canJumpCheckLeft && this.cantJumpCheckLeft == false) {
         this.droid.body.velocity.y = -100;
         this.jump = true;
       } else {
         if (this.droid.body.touching.down == false) {
           this.droid.body.velocity.y = 200;
         }
         this.jump = false;
       }
     }

     this.game.physics.arcade.collide(game.collisionLayer, this.droid);



     // console.log(droidNumber);
   }
   if ((droidHealth[droidNumber] <= 0 && droidInvincibility[droidNumber] != 99) || activeLevel != 2) {
     this.jumpRightHB1.kill();
     this.jumpRightHB2.kill();
     this.jumpLeftHB1.kill();
     this.jumpLeftHB2.kill();
     this.droidHB.kill();
     this.droid.kill();
     this.baton.kill();
     if (droidHealth[droidNumber] <= 0 && droidInvincibility[droidNumber] != 99) {
       this.smallExplosion = game.enemies.create(this.droid.x, this.droid.y, 'smallExplosion');
       this.smallExplosion.alpha = 0.8;
       this.smallExplosion.anchor.setTo(0.5);
       this.smallExplosion.scale.setTo(3);
       this.smallExplosion.smoothed = false;
       this.smallExplosion.animations.add('fadeExplosion', [0, 1, 2, 3, 4, 5, 6], 15, false);
       this.smallExplosion.animations.play('fadeExplosion');
     }
     droidInvincibility[droidNumber] = 99;
     this.kill();
     this.destroy();
   }
 }

 this.droidFnc.prototype.hitboxCheckDroidBaton = function(body1, body2, ) {

   // console.log(droidNumber + " L");

   if (((((body1.sprite.key === 'baton' && body2.sprite.key === 'playerHB') || (body2.sprite.key === 'baton' && body1.sprite.key === 'playerHB')) && droidAttack[droidNumber] == 3 && droidAttackTimer[droidNumber] < 30) || ((body1.sprite.key === 'droid' && body2.sprite.key === 'playerHB') || (body2.sprite.key === 'droid' && body1.sprite.key === 'playerHB'))) && playerInvincibility == 0) {
     playerHealth -= 1;
     playerInvincibility = 60;
   }
   if (((body1.sprite.key === 'wrench' && body2.sprite.key === 'droid') || (body2.sprite.key === 'wrench' && body1.sprite.key === 'droid')) && swing == 1 && droidInvincibility[droidNumber] == 0) {
     droidHealth[droidNumber] -= 1;
     droidInvincibility[droidNumber] = 75;
     // if (player.x < this.droid.x) {
     //   game.droidXDummy += 500;
     //   game.droidYDummy += -90;
     // } else {
     //   game.droidXDummy += -500;
     //   game.droidYDummy += -90;

     //}
   }
   return false;

 }
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
 var level2CollisionX = [123, 2200, 15, 1200, 72, 204, 72, 2399];
 var level2CollisionY = [200, 200, 400, 53, 111, 100, 51, 30];
 var level1Data = [false];
 var arrayDummy = 0;
 var activeLevel = 0;
 var transition = 0;
 var transitionYDummy;
 var transitionXDummy;
 var playerHealth = 4;
 var playerInvincibility = 0;
 var droids = [];
 var droidAttack = [];
 var droidAttackTimer = [];
 var droidInvincibility = [];
 var droidHealth = [];
 var droidX = [];
 var droidY = [];


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

   game.load.image('playerHB', 'assets/player/playerHB.png');
   game.load.image('gameTitle', 'assets/title/game.png');
   game.load.image('prompt', 'assets/title/prompt.png');
   game.load.image('ventDoor', 'assets/environments/bathroom/ventDoor.png');
   game.load.image('doorBlue', 'assets/environments/doors/doorBlue.png');
   game.load.atlasJSONHash('stars', 'assets/title/stars/stars.png', 'assets/atlasData/stars.json');
   game.load.atlasJSONHash('bathroomSprites', 'assets/environments/bathroom/bathroom.png', 'assets/atlasData/bathroom.json');
   game.load.atlasJSONHash('panel', 'assets/environments/doors/panel.png', 'assets/atlasData/panel.json');
   game.load.atlasJSONHash('level2(1)', 'assets/environments/level2/level2(1).png', 'assets/atlasData/level2(1).json');
   game.load.atlasJSONHash('smallExplosion', 'assets/misc/smallExplosion.png', 'assets/atlasData/smallExplosion.json');
   game.load.atlasJSONHash('droid', 'assets/enemies/droid.png', 'assets/atlasData/droid.json');
   game.load.atlasJSONHash('baton', 'assets/enemies/baton.png', 'assets/atlasData/baton.json');
   game.load.atlasJSONHash('health', 'assets/player/health.png', 'assets/atlasData/health.json');
   game.load.atlasJSONHash('healthBackground', 'assets/player/healthBackground.png', 'assets/atlasData/healthBackground.json');
 }

 function create() {

   console.log("Use A and D to move, SPACEBAR to jump, and left mouse button to attack");
   game.physics.startSystem(Phaser.Physics.P2JS);
   game.physics.p2.setPostBroadphaseCallback(hitboxCheckWrench, this);

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
   game.hud = game.add.group();

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

   fade.scale.setTo(2300, 900);
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

     if (playerInvincibility > 0) {
       playerInvincibility -= 1;
       player.alpha = 0.4;
     } else {
       player.alpha = 1;
     }
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

     if (player.y < 516 && player.x < 1103) {
       game.add.tween(ventCover).to({
         alpha: 0
       }, 300, Phaser.Easing.Linear.None, true);
     } else if (player.y > 516 || player.x > 1103) {
       game.add.tween(ventCover).to({
         alpha: 1
       }, 300, Phaser.Easing.Linear.None, true);

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
     if (spaceTimer <= -600 || player.body.touching.up) {
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
       player.body.velocity.y = -300;
       player.body.velocity.x = 0;
       player.x = 210;
       player.y = game.world.height - 20;
       wrench.body.x = player.x;
       wrench.body.y = player.y;
       transitionXDummy = player.x;
       transitionYDummy = player.y;
     }

     if (activeLevel == 2 && player.y > game.world.height) {
       game.backgroundLayer.callAll('kill');
       game.doorLayer.callAll('kill');
       game.mainLayer.callAll('kill');
       game.doorLayer.callAll('kill');
       game.collisionLayer.callAll('kill');
       game.foregroundLayer.callAll('kill');
       game.enemies.callAll('kill');

       loadLevel1();
       player.body.velocity.y = 0;
       player.body.velocity.x = 0;
       player.x = 1327;
       player.y = 6;
       wrench.body.x = player.x;
       wrench.body.y = player.y;

     }
     if (transition != 0) {
       if (player.y > transitionYDummy - 150) {
         player.body.velocity.y -= 15;
         player.body.velocity.x = 0;
       } else {
         if (transition == 1) {
           player.x = transitionXDummy + 16;
           player.body.velocity.x = 0;
           transition = 2;
         }
       }
       if (transition == 2) {
         player.body.velocity.x += 35;
         player.body.velocity.y += 15;
       }

       if (player.body.touching.down) {
         transition = 0;
         player.body.velocity.x = 0;
         player.body.velocity.y = 0;
       }
     }


     if (game.input.activePointer.leftButton.isDown) {
       mouse1down = 1;
       //console.log((this.input.mousePointer.x + this.camera.x) + " - " + (this.input.mousePointer.y + this.camera.y));
     } else {
       mouse1down = 0;
     }
     playerHB.body.x = player.x + (player.body.velocity.x / 60);
     playerHB.body.y = player.y + (player.body.velocity.y / 60);

     healthHead.frame = 0 + 4 - playerHealth;
     if (playerHealth == 0) {

       player.x = 800;
       player.y = 600;
       wrench.body.x = player.x;
       wrench.body.y = player.y;
       player.body.velocity.x = 0;
       player.body.velocity.y = 0;
       playerHealth = 4;

       game.backgroundLayer.callAll('kill');
       game.doorLayer.callAll('kill');
       game.mainLayer.callAll('kill');
       game.doorLayer.callAll('kill');
       game.collisionLayer.callAll('kill');
       game.enemies.callAll('kill');

       loadLevel1();
     }
     wrench.body.velocity.x = 0;
     wrench.body.velocity.y = 0;

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

   player = game.playerLayer.create(800, 600, 'player');
   playerHB = game.add.sprite(0, 0, 'playerHB');
   wrench = game.weapons.create(800, 600, 'wrench');
   camera = game.add.sprite(400, 300);
   healthBackground = game.hud.create(0, 0, 'healthBackground');
   healthHead = game.hud.create(0, 0, 'health');

   for (var i = 0; i < 4; i++) {
     new healthFnc(game, (i * 60) + 150, 70, i);
   }

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

   playerHB.alpha = 0;
   game.physics.p2.enable([playerHB], false);
   playerHB.body.setRectangle(50, 85, 0, 0, 0);
   playerHB.body.immovable = true;

   game.physics.p2.enable([wrench], false);
   wrench.body.immovable = true;
   wrench.anchor.setTo(.15, .5);
   wrench.smoothed = false;
   wrench.scale.setTo(3);
   wrench.visible = true;
   wrench.frame = 1;
   wrench.body.setRectangle(60, 90, 80, 0, 0);

   wrench.animations.add('swing', [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1], 30, false);

   healthBackground.scale.setTo(3);
   healthBackground.anchor.setTo(0.5);
   healthBackground.smoothed = false;
   healthBackground.fixedToCamera = true;
   healthBackground.cameraOffset.setTo(242, 70);

   healthBackground.animations.add('charge', [0, 1, 2, 3, 4, 5, 6], 10, true)
   healthBackground.animations.play('charge')

   healthHead.scale.setTo(3);
   healthHead.anchor.setTo(0.5);
   healthHead.smoothed = false;
   healthHead.fixedToCamera = true;
   healthHead.cameraOffset.setTo(75, 64);
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

 function hitboxCheckWrench(body1, body2) {
   if (((body1.sprite.key === 'wrench' && body2.sprite.key === 'panel') || (body2.sprite.key === 'wrench' && body1.sprite.key === 'panel')) && swing == 1) {
     if (body2.sprite.key === 'panel') {
       body2.sprite.frame = 1;
     } else {
       body1.sprite.frame = 1;
     }
   }
 }


 function render() {
   if (gameMode == 2) {
     // game.debug.body(player);
     //game.debug.physicsGroup(game.collisionLayer);
     // game.debug.physicsGroup(game.doorLayer);
     //game.debug.physicsGroup(game.enemies);

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

   ventCover = game.foregroundLayer.create(0, 0, 'bathroomSprites');
   ventCover.frame = 2;
   ventCover.scale.setTo(3);
   ventCover.smoothed = false;


   new doorBlueFnc(game, wrench, 1010, 612, 950, 210);

   activeLevel = 1;
 }

 function loadLevel2() {
   game.world.setBounds(0, 0, 6000, 6000);
   activeLevel = 2;

   game.levelData = JSON.parse(game.cache.getText('Level2JSON'));

   game.levelData.level2Main.forEach(function(element) {
     game.backgroundLayer.create(element.x, element.y, element.image);
   });
   JSONLoad(game, game.backgroundLayer, 1);

   game.levelData.level2Main.forEach(function(element) {
     game.mainLayer.create(element.x, element.y, element.image)
   }, this);
   JSONLoad(game, game.mainLayer, 0);
   game.levelData.level2Collision.forEach(function(element, arrayDummy) {
     arrayDummyAdd();
     colBox = game.collisionLayer.create(element.x, element.y, element.image);
     colBox.scale.setTo(level2CollisionX[arrayDummy], level2CollisionY[arrayDummy]);
     colBox.body.immovable = true;
     colBox.anchor.setTo(0);
   });
   arrayDummy = 0;
   game.levelData.level2Droids.forEach(function(element, arrayDummy) {
     arrayDummyAdd();
     droids[arrayDummy] = "droid" + (arrayDummy + 1);
     new droidFnc(game, element.x, element.y, false, 0, 0, arrayDummy);
   });
   // console.log(droids);
   arrayDummy = 0;

 }