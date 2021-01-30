// gọi các biến, không xóa
var gameState = {};
var playerDirection;
const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 400 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT
const healthpoints = 100;

// đây là lập nên cái canvas để mình chơi
var config = {
    type: Phaser.AUTO,
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
    this.load.audio('main_audio', 'https://labs.phaser.io/assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.m4a')
    // gạch trong dungeon
    this.load.image('tiles', 'resource/0x72_DungeonTilesetII_v1.3.1/tileset.png');
    // dungeon map
    this.load.tilemapTiledJSON('dungeon', 'resource/dungeon.json')
    // player
    this.load.spritesheet('player', 'resource/spritesheet.png', { frameWidth: number, frameHeight: number })
    this.load.spritesheet('slash', 'resource/slash-sprite.png', { frameWidth: number * 3, frameHeight: number * 3 })
    this.load.spritesheet('skeleton', 'resource/skeleton.png', { frameWidth: number, frameHeight: number })
}
// khởi tạo các thành phần trong game
function create() {
    // tạo dungeon
    const music = this.sound.add("main_audio")
    for (let i = 0; i<10; i++) {
        music.play();
    }
    const map = this.make.tilemap({ key: 'dungeon' })
    const tileset = map.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles', 16, 16, 1, 2)
    map.createLayer(0, tileset, 0, 0)
    const wallLayer = map.createLayer(1, tileset, 0, 0)
    // map.createLayer(2, tileset, 0, 0)
    // map.createLayer(3, tileset, 0, 0)
    // map.createLayer(4, tileset, 0, 0)

    wallLayer.setCollisionByProperty({ collides: true })

    //tạo player
    gameState.player = this.physics.add.sprite(640, 1050, 'player', 240);
    // sửa khung của player - tuyệt đói không xóa đi
    gameState.player.body.setSize(gameState.player.width * 0.5, gameState.player.height * 0.5)
    gameState.player.body.offset.y = 33
    gameState.skeleton = this.add.sprite(600, 670, 'skeleton', 131)

    // const skeletons = this.physics.add.group({
    //     classType: Skeleton
    // })
    // skeletons.get(600, 670, 'skeleton')

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

    // skeleton khi di chuyen
    gameState.skeleton.anims.create({
        key: 'skeleton-idle-up',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 8 * 13, end: 8 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.skeleton.anims.create({
        key: 'skeleton-idle-left',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 9 * 13, end: 9 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.skeleton.anims.create({
        key: 'skeleton-idle-down',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 10 * 13, end: 10 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.skeleton.anims.create({
        key: 'skeleton-idle-right',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 11 * 13, end: 11 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });

    // skeleton khi dam
    gameState.skeleton.anims.create({
        key: 'skeleton-thrust-up',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 4 * 13, end: 4 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.skeleton.anims.create({
        key: 'skeleton-thrust-left',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 5 * 13, end: 5 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.skeleton.anims.create({
        key: 'skeleton-thrust-down',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 6 * 13, end: 6 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    gameState.skeleton.anims.create({
        key: 'skeleton-thrust-right',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 7 * 13, end: 7 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });

    // tạo bàn phím cho người chơi
    gameState.cursors = this.input.keyboard.createCursorKeys();
    // cho người chơi đâm vào tường chứ không xuyên qua
    this.physics.add.collider(gameState.player, wallLayer);
    // camera/cái nhìn sẽ đi theo người chơi
    this.cameras.main.startFollow(gameState.player);
    // minimap ở trên cùng
    this.minimap = this.cameras.add(-50, -30, 200, 200).setZoom(0.05)
    const baseBar = this.add.graphics();
    baseBar.fillRoundedRect(10, 10, 200, 20, 5);
    baseBar.fillStyle(0x2bc213)
    baseBar.setScrollFactor(0, 0)
    gameState.bloodBar = this.add.graphics();
    gameState.bloodBar.fillRoundedRect(10, 10, healthpoints * 2, 20, 5);
    gameState.bloodBar.fillStyle(0x808080)
    gameState.bloodBar.setScrollFactor(0, 0)

    gameState.healthText = this.add.text(13, 13, '100/100', { fill: '#fff' })
    gameState.healthText.setScrollFactor(0, 0)
};

// gọi thêm một hàm khi chém
function slash() {
    if (playerDirection == 'right') {
        // animation khi chẻm và đang hướng phải
        gameState.player.anims.play('slash-right', true);
    }
    else if (playerDirection == 'left') { gameState.player.anims.play('slash-left', true); }
    else if (playerDirection == 'up') { gameState.player.anims.play('slash-up', true); }
    else if (playerDirection == 'down') { gameState.player.anims.play('slash-down', true); }
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
    else if (gameState.cursors.space.isDown) { slash(); }
    else {
        // không hoạt động gì
        gameState.player.anims.stop()
        gameState.player.setVelocity(0, 0)
    }
    gameState.skeleton.anims.play("skeleton-thrust-right", true)
}