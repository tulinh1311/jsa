// gọi các biến, không xóa
var gameState = {};
var playerDirection;
const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 400 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

// đây là lập nên cái canvas để mình chơi
var config = {
    type: Phaser.AUTO,
    // width: DEFAULT_WIDTH,
    // height: DEFAULT_WIDTH,
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
        zoom: 1.15,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    }
};
var number = 64;
var game = new Phaser.Game(config);

// các hình ảnh sẽ được up lên trước và lưu tại đây
function preload() {
    // this.load.image('sky', 'https://labs.phaser.io/assets/skies/starfield.png');

    // gạch trong dungeon
    this.load.image('tiles', 'resource/0x72_DungeonTilesetII_v1.3.1/tileset.png');
    // dungeon map
    this.load.tilemapTiledJSON('dungeon', 'resource/dungeon.json')
    // player
    this.load.spritesheet('player', 'resource/spritesheet.png', { frameWidth: number, frameHeight: number })
    this.load.spritesheet('slash', 'resource/slash-sprite.png', { frameWidth: number * 3, frameHeight: number * 3 })
}

// khởi tạo các thành phần trong game
function create() {
    // tạo dungeon
    const map = this.make.tilemap({ key: 'dungeon' })
    const tileset = map.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles', 16, 16, 1, 2)
    map.createLayer(0, tileset, 0, 0)
    const wallLayer = map.createLayer(1, tileset, 0, 0)
    // map.createLayer(2, tileset, 0, 0)
    // map.createLayer(3, tileset, 0, 0)
    // map.createLayer(4, tileset, 0, 0)

    wallLayer.setCollisionByProperty({ collides: true })

    //tạo player
    gameState.player = this.physics.add.sprite(640, 1050, 'player');
    // sửa khung của player - tuyệt đói không xóa đi
    gameState.player.body.setSize(gameState.player.width * 0.5, gameState.player.height * 0.85)

    // phần animation - gọi ra trước, dùng sau
    // khi di chuyển
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
    // khi chém
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

    // tạo bàn phím cho người chơi
    gameState.cursors = this.input.keyboard.createCursorKeys();
    // cho người chơi đâm vào tường chứ không xuyên qua
    this.physics.add.collider(gameState.player, wallLayer);
    // camera/cái nhìn sẽ đi theo người chơi
    this.cameras.main.startFollow(gameState.player);
    // minimap ở trên cùng
    this.minimap = this.cameras.add(0, 0, 200, 200).setZoom(0.05)

};

// gọi thêm một hàm khi chém
function slash() {
    if (playerDirection == 'right') {
        // animation khi chẻm và đang hướng phải
        gameState.player.anims.play('slash-right', true);
    }
    else if (playerDirection == 'left') {
        gameState.player.anims.play('slash-left', true);
    }
    else if (playerDirection == 'up') {
        gameState.player.anims.play('slash-up', true);
    }
    else if (playerDirection == 'down') {
        gameState.player.anims.play('slash-down', true);
    }
}

var speed = 100;
// khi người chơi thao tác thì cái gì xảy ra:
function update() {
    // gameState.cursors.{{ up/dow/left/right/space/shift }}.isDown : khi giữ phím
    if (gameState.cursors.right.isDown) {
        // cho nhân vật di chuyển
        gameState.player.setVelocity(speed, 0)
        // chơi animation khi di chuyển phải
        gameState.player.anims.play('right', true);
        // lưu lại để dùng khi chém
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
        // chém
        slash()
    }

    else {
        // không hoạt động gì
        gameState.player.anims.stop()
        gameState.player.setVelocity(0, 0)
    }

}