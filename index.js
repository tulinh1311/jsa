import { createCharacterAnims } from "./module/CharacterAnims.js";
import { createSkeletonAnims } from "./module/EnemyAnims.js";
import { healthBar } from "./module/HealthBar.js";
import { musicButton } from "./module/MusicButton.js";
import { preloader } from "./module/Preloader.js";
// import { start } from "./module/Startscene.js";

// gọi các biến, không xóa
var gameState = {};
var goLeft = false;
var goRight = false;
var goUp = false;
var goDown = false;
var ifSlash = false;
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
            // debug: true
        }
    },
    input :{
		activePointers:3,
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
    preloader(this)
}

// khởi tạo các thành phần trong game
function create() {
    // tạo dungeon
    gameState.swordSound = this.sound.add('swordSound')
    const music = this.sound.add("main_audio", { loop: true })
    music.play()
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

    createCharacterAnims(gameState.player.anims)
    createSkeletonAnims(gameState.skeleton.anims)

    // tạo bàn phím cho người chơi
    gameState.cursors = this.input.keyboard.createCursorKeys();
    // cho người chơi đâm vào tường chứ không xuyên qua
    this.physics.add.collider(gameState.player, wallLayer);
    // camera/cái nhìn sẽ đi theo người chơi
    this.cameras.main.startFollow(gameState.player);
    // minimap ở trên cùng
    this.minimap = this.cameras.add(-50, -30, 200, 200).setZoom(0.05)
    healthBar(this)

    gameState.arrowUp = this.add.image(100, DEFAULT_HEIGHT-150, 'arrowUp').setAlpha(0.7).setScale(0.7).setScrollFactor(0, 0).setInteractive().on('pointerdown', function () { goUp = true; this.alpha = 1}).on('pointerup', function () { goUp = false ; this.alpha = 0.7 });
    gameState.arrowDown = this.add.image(100, DEFAULT_HEIGHT-50, 'arrowDown').setAlpha(0.7).setScale(0.7).setScrollFactor(0, 0).setInteractive().on('pointerdown', function () { goDown = true; this.alpha = 1 }).on('pointerup', function () { goDown = false; this.alpha = 0.7 });
    gameState.arrowLeft = this.add.image(50, DEFAULT_HEIGHT-100, 'arrowLeft').setAlpha(0.7).setScale(0.7).setScrollFactor(0, 0).setInteractive().on('pointerdown', function () { goLeft = true; this.alpha = 1 }).on('pointerup', function () { goLeft = false; this.alpha = 0.7 });
    gameState.arrowRight = this.add.image(150, DEFAULT_HEIGHT-100, 'arrowRight').setAlpha(0.7).setScale(0.7).setScrollFactor(0, 0).setInteractive().on('pointerdown', function () { goRight = true; this.alpha = 1 }).on('pointerup', function () { goRight = false; this.alpha = 0.7 });
    gameState.slashButton = this.add.circle(DEFAULT_WIDTH-90, DEFAULT_HEIGHT-90, 50, 0xffffff, 0.7).setScrollFactor(0, 0).setInteractive().on('pointerdown', function () { ifSlash = true; this.alpha = 1 }).on('pointerup', function () { ifSlash = false; this.alpha = 0.7 });
    this.add.image(DEFAULT_WIDTH-90, DEFAULT_HEIGHT-90, 'gladius').setScrollFactor(0, 0).setScale(0.13)
    
    musicButton(this, DEFAULT_HEIGHT, DEFAULT_WIDTH)
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
var speed = 100
// khi người chơi thao tác thì cái gì xảy ra:
function update() {
    // gameState.cursors.{{ up/dow/left/right/space/shift }}.isDown : khi giữ phím
    if (gameState.cursors.right.isDown || goRight) {
        // cho nhân vật di chuyển
        gameState.player.setVelocity(speed, 0)
        // chơi animation khi di chuyển phải
        gameState.player.anims.play('right', true);
        // lưu lại để dùng khi chém
        playerDirection = 'right'
    }
    else if (gameState.cursors.left.isDown || goLeft) {
        gameState.player.setVelocity(-speed, 0)
        gameState.player.anims.play('left', true);
        playerDirection = 'left'
    }
    else if (gameState.cursors.up.isDown || goUp) {
        gameState.player.setVelocity(0, -speed)
        gameState.player.anims.play('up', true);
        playerDirection = 'up'
    }
    else if (gameState.cursors.down.isDown || goDown) {
        gameState.player.setVelocity(0, speed)
        gameState.player.anims.play('down', true);
        playerDirection = 'down'
    }
    else if (gameState.cursors.space.isDown || ifSlash) { slash(); gameState.swordSound.play()}
    else {
        // không hoạt động gì
        gameState.player.anims.stop()
        gameState.player.setVelocity(0, 0)

    }
    gameState.skeleton.anims.play("skeleton-thrust-right", true)

}