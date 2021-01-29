var gameState = {};
var playerDirection;
var spaceBar;
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    scale: {
        zoom: 1.15
    }
};
var number = 64;
var game = new Phaser.Game(config);

function preload() {
    // background image 
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/starfield.png');
    this.load.image('tiles', 'resource/0x72_DungeonTilesetII_v1.3.1/0x72_DungeonTilesetII_v1.3.png');
    this.load.tilemapTiledJSON('dungeon', 'resource/dungeon.json')
    // player
    this.load.spritesheet('player', 'resource/spritesheet.png', { frameWidth: number, frameHeight: number })
    this.load.spritesheet('slash', 'resource/slash-sprite.png', { frameWidth: number * 3, frameHeight: number * 3 })
}

function create() {
    // this.add.image(200, 150, 'sky');
    const map = this.make.tilemap({ key: 'dungeon'})
    const tileset = map.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles')
    map.createLayer(0, tileset, 0, 0)
    const wallLayer = map.createLayer(1, tileset, 0, 0)
    map.createLayer(2, tileset, 0, 0)
    map.createLayer(3, tileset, 0, 0)

    wallLayer.setCollisionByProperty({ collides: true })
    
    gameState.player = this.physics.add.sprite(200, 150, 'player');
    gameState.player.body.setSize(gameState.player.width*0.5, gameState.player.height*0.85)
    gameState.player.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 192, end: 200 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.player.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 216, end: 224 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.player.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 240, end: 248 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.player.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 264, end: 272 }),
        frameRate: 10,
        repeat: -1
    });

    gameState.player.anims.create({
        key: 'slash-up',
        frames: this.anims.generateFrameNumbers('slash', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 1
    });
    gameState.player.anims.create({
        key: 'slash-left',
        frames: this.anims.generateFrameNumbers('slash', { start: 6, end: 11 }),
        frameRate: 10,
        repeat: 1
    });
    gameState.player.anims.create({
        key: 'slash-down',
        frames: this.anims.generateFrameNumbers('slash', { start: 12, end: 17 }),
        frameRate: 10,
        repeat: 1
    });
    gameState.player.anims.create({
        key: 'slash-right',
        frames: this.anims.generateFrameNumbers('slash', { start: 18, end: 23 }),
        frameRate: 10,
        repeat: 1
    });

    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(gameState.player, wallLayer);
    this.cameras.main.startFollow(gameState.player);
    this.minimap = this.cameras.add(0, 0, 200, 200).setZoom(0.05)
    // spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};
function slash() {
    if (playerDirection == 'right') {
        // gameState.player.setTexture('slash', 18)
        gameState.player.anims.play('slash-right', true);
    }
    else if (playerDirection == 'left') {
        // gameState.player.setTexture('slash', 6)
        gameState.player.anims.play('slash-left', true);
    }
    else if (playerDirection == 'up') {
        // gameState.player.setTexture('slash', 0)
        gameState.player.anims.play('slash-up', true);
    }
    else if (playerDirection == 'down') {
        // gameState.player.setTexture('slash', 12)
        gameState.player.anims.play('slash-down', true);
    }
}
var speed = 100
function update() {
    if (gameState.cursors.right.isDown) {
        gameState.player.setVelocity(speed, 0)
        gameState.player.anims.play('right', true);
        playerDirection = 'right'

    }
    else if (gameState.cursors.left.isDown) {
        gameState.player.setVelocity(-speed, 0)
        gameState.player.anims.play('left', true);
        playerDirection = 'left'

    }
    else if (gameState.cursors.up.isDown) {
        gameState.player.setVelocity(0, -speed)
        gameState.player.anims.play('up', true);
        playerDirection = 'up'

    }
    else if (gameState.cursors.down.isDown) {
        gameState.player.setVelocity(0, speed)
        gameState.player.anims.play('down', true);
        playerDirection = 'down'
    }
    else if (gameState.cursors.space.isDown) {
        slash()
        // gameState.player.anims.stop()
        // spaceBar = false;
    }

    else {
        gameState.player.anims.stop()
        gameState.player.setVelocity(0,0)
    }

}