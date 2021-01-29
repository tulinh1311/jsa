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
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/starfield.png');
    // player
    this.load.spritesheet('player', 'resource/spritesheet.png', { frameWidth: 64, frameHeight: 64 })
}

function create ()
{
    this.add.image(400, 300, 'sky');
    gameState.player = this.add.sprite(400, 300, 'player');

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 192, end: 200 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 216, end: 224 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 240, end: 248 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 264, end: 272 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'nonw',
        frames: this.anims.generateFrameNumbers('player', { frame: 18 }),
        frameRate: 20,
    });

    gameState.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (gameState.cursors.right.isDown) {
        gameState.player.x += 2
        gameState.player.anims.play('right', true);
      }
    else if (gameState.cursors.left.isDown) {
    gameState.player.x -= 2
    gameState.player.anims.play('left', true);
    }
    else if (gameState.cursors.up.isDown) {
    gameState.player.y -= 2;
    gameState.player.anims.play('up', true);
    }
    else if (gameState.cursors.down.isDown) {
    gameState.player.y += 2;
    gameState.player.anims.play('down', true);
    }
    else {
    gameState.player.anims.play('none');
    }
}