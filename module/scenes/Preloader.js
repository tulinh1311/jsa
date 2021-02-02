import { loadingBar } from "../LoadingBar.js"

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }
    preload() {
        loadingBar(this)

        this.load.audio('swordSound', 'https://labs.phaser.io/assets/audio/SoundEffects/sword.mp3')
        this.load.tilemapTiledJSON('dungeon', 'resource/dungeon.json')
        this.load.spritesheet('player', 'resource/spritesheet.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('skeleton', 'resource/skeleton.png', { frameWidth: 64, frameHeight: 64 })
        this.load.image('arrowUp', 'resource/arrow/arrowUp.png')
        this.load.image('arrowDown', 'resource/arrow/arrowDown.png')
        this.load.image('arrowLeft', 'resource/arrow/arrowLeft.png')
        this.load.image('arrowRight', 'resource/arrow/arrowRight.png')

        this.load.image('gladius', 'resource/gladius.png')

        this.load.image('musicOn', 'resource/musicOn.png')
        this.load.image('musicOff', 'resource/musicOff.png')
        this.load.image('homeButton', 'resource/home.png')
        this.load.audio('main_audio', 'https://labs.phaser.io/assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.m4a')
        // gạch trong dungeon
        this.load.image('tiles', 'resource/0x72_DungeonTilesetII_v1.3.1/tileset.png');
        // dungeon map
        this.load.tilemapTiledJSON('startBackground', 'resource/menu.json')
        // player
        this.load.spritesheet('slash', 'resource/slash-sprite.png', { frameWidth: 64 * 3, frameHeight: 64 * 3 })

        this.load.image('startbutton', 'resource/startbutton.png')
        this.load.image('bg', 'https://labs.phaser.io/assets/skies/starfield.png')
        this.load.image('logo', 'resource/logo.png')
        this.load.image('guidance', 'resource/guidance.png')

    }

    create() {
        const music = this.sound.add("main_audio", { loop: true })
        music.play()
        this.scene.start('startscene')
    }
}
