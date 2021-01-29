var gameState = {};
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    // background image 
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
    // player
    this.load.spritesheet('player', 'resource/simple-sprite.png', { frameWidth: 64, frameHeight: 64 })
}

function create ()
{
    this.add.image(400, 300, 'sky');
    gameState.player = this.add.sprite(400, 300, 'player');

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 17 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 18, end: 26 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 27, end: 35 }),
        frameRate: 10,
        repeat: -1
    });

    gameState.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (gameState.cursors.right.isDown) {
        gameState.player.x += 2
        gameState.player.anims.play('right', true);
      }
      if (gameState.cursors.left.isDown) {
        gameState.player.x -= 2
        gameState.player.anims.play('left', true);
      }
      if (gameState.cursors.up.isDown) {
        gameState.player.y -= 2;
        gameState.player.anims.play('up', true);
      }
      if (gameState.cursors.down.isDown) {
        gameState.player.y += 2;
        gameState.player.anims.play('down', true);
      }
}