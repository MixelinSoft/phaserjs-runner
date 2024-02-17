const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1024 },
      debug: false,
    },
  },
};

let jumpKey;
let player;
let floor;

function preload() {
  this.load.image('background', './assets/background.png');
  this.load.image('floor', './assets/floor.png');
  // Players Sprites
  this.load.spritesheet('player_run', './assets/player/player_run.png', {
    frameWidth: 128,
    frameHeight: 128,
  });
  this.load.spritesheet('player_jump', './assets/player/player_jump.png', {
    frameWidth: 128,
    frameHeight: 128,
  });

  this.load.audio('jump', './assets/audio/jump.ogg');
  // this.load.audio('backgroundMusic', './assets/audio/backgroundMusic.mp3');
}

function create() {
  // Add Background
  this.add.image(0, 0, 'background').setOrigin(0, 0);

  // Add Floor
  floor = this.physics.add.staticGroup();
  floor
    .create(0, 576 - 32, 'ground')
    .setOrigin(0, 0)
    .setScale(36)
    .refreshBody();
  // Add Player
  player = this.physics.add.sprite(128, 128, 'player_run');
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);
  // Config Player Animation
  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('player_run', { start: 0, end: 7 }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('player_jump', {
      start: 0,
      end: 7,
    }),
    frameRate: 7,
    repeat: 0,
  });
  // Add Player Collision
  this.physics.add.collider(player, floor);
  // Start Player Animation
  player.play('run');
  //Setup Keys
  this.jumpKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );
  // Audio
  // this.backgroundMusic = this.sound.add('backgroundMusic');
  this.jumpSound = this.sound.add('jump');
  // this.backgroundMusic.play();
}

function update() {
  // Jump
  if (this.jumpKey.isDown && player.body.touching.down) {
    // player.stop('run');
    // player.play('jump');
    player.setVelocityY(-864);
    this.jumpSound.play();
    player.play('jump');
  }
}

const game = new Phaser.Game(config);
