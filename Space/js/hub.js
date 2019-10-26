var hubState = {

  create: function() {
    game.world.setBounds(0, 0, 1200, 900);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    yellow = game.add.sprite(0, 0, 'yellow');
    floor = game.add.sprite(400, 800, 'floor');
    player = game.add.sprite(400, 250, 'player');
    bathroom = game.add.sprite(600, 379, 'bathroom');
    peaShooter = game.add.sprite(200, 200, 'peaShooter');
    wrench = game.add.sprite(200, 200, 'wrench');
    camera = game.add.sprite(400, 300);
    //  slash = game.add.sprite(200, 200, 'slash');
    yellow.scale.setTo(1200, 900);

    player.frame = 0;
    game.physics.enable(player);
    player.scale.setTo(3);
    player.anchor.setTo(0.5);
    player.smoothed = false;
    game.physics.arcade.enable(player);
    player.enableBody = true;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

    player.animations.add('runForward', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);

    peaShooter.anchor.setTo(.15, .5);
    peaShooter.smoothed = false;
    peaShooter.scale.setTo(3);
    peaShooter.visible = false;

    wrench.anchor.setTo(.15, .5);
    wrench.smoothed = false;
    wrench.scale.setTo(3);
    wrench.visible = true;
    wrench.frame = 1;

    wrench.animations.add('swing', [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1], 30, false);

    floor.smoothed = false;
    floor.anchor.setTo(0.5);
    floor.scale.setTo(3);
    game.physics.arcade.enable(floor);
    floor.enableBody = true;
    floor.body.immovable = true;

    bathroom.smoothed = false;
    bathroom.scale.setTo(3);
    bathroom.anchor.setTo(0.5);

    W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    A = game.input.keyboard.addKey(Phaser.Keyboard.A);
    S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    D = game.input.keyboard.addKey(Phaser.Keyboard.D);

    game.camera.follow(camera, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    player.body.collideWorldBounds = true;
    swing = 0;
  },

  update: function() {
    var PlayerCollisionFloor = game.physics.arcade.collide(player, floor);

    if (player.body.velocity.x > 0) {
      player.body.velocity.x -= 20;
    } else if (player.body.velocity.x < 0) {
      player.body.velocity.x += 20;
    }

    if (player.body.velocity.x < 15 && player.body.velocity.x > -15) {
      player.body.velocity.x = 0;
    }
    if (A.isDown) {
      player.body.velocity.x = -200;
    } else if (D.isDown) {
      player.body.velocity.x = 200;
    }

    peaShooter.y = player.y;
    if (player.x - (this.input.mousePointer.x + this.camera.x) > 0) {
      peaShooter.scale.setTo(3, -3);
      player.scale.setTo(-3, 3);
      peaShooter.x = player.x - 10;

    } else {
      peaShooter.scale.setTo(3);
      player.scale.setTo(3);
      peaShooter.x = player.x + 10;

    }
    peaShooter.rotation = Phaser.Math.angleBetween(player.position.x, peaShooter.position.y, this.input.mousePointer.x + this.camera.x, this.input.mousePointer.y + this.camera.y);

    wrench.y = player.y;

    if (player.x - (this.input.mousePointer.x + this.camera.x) > 0) {
      wrench.scale.setTo(3, -3);
      player.scale.setTo(-3, 3);
      wrench.x = player.x - 6;

    } else {
      wrench.scale.setTo(3);
      player.scale.setTo(3);
      wrench.x = player.x + 6;

    }
    if (swing == 1) {
      if (player.x - (this.input.mousePointer.x + this.camera.x) > 0) {
        wrench.rotation = Phaser.Math.angleBetween(player.position.x, wrench.position.y, this.input.mousePointer.x + this.camera.x, this.input.mousePointer.y + this.camera.y) - (wrench.frame * 70) / 360 + 1;
      } else {
        wrench.rotation = Phaser.Math.angleBetween(player.position.x, wrench.position.y, this.input.mousePointer.x + this.camera.x, this.input.mousePointer.y + this.camera.y) + (wrench.frame * 70) / 360 - 1;
      }
    } else {
      wrench.rotation = Phaser.Math.angleBetween(player.position.x, wrench.position.y, this.input.mousePointer.x + this.camera.x, this.input.mousePointer.y + this.camera.y);
    }
    if (game.input.activePointer.leftButton.isDown && Mouse1Down == 0) {
      swingAnim = wrench.animations.play('swing');
      swing = 1;
      swingAnim.onComplete.add(this.swingComplete, this);
    }
    if (game.input.activePointer.leftButton.isDown) {
      Mouse1Down = 1;
    } else {
      Mouse1Down = 0;
    }
    camera.x = player.x;
    camera.y = player.y - 125;
  },
  swingComplete: function() {
    swing = 0;
  }
};