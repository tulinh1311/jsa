export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }
    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '16px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '16px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '16px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        var number = 64
        this.load.audio('main_audio', 'https://labs.phaser.io/assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.m4a')
        this.load.audio('swordSound', 'https://labs.phaser.io/assets/audio/SoundEffects/sword.mp3')
        // gạch trong dungeon
        this.load.image('tiles', 'resource/0x72_DungeonTilesetII_v1.3.1/tileset.png');
        // dungeon map
        this.load.tilemapTiledJSON('dungeon', 'resource/dungeon.json')
        this.load.tilemapTiledJSON('startBackground', 'resource/menu.json')
        // player
        this.load.spritesheet('player', 'resource/spritesheet.png', { frameWidth: number, frameHeight: number })
        this.load.spritesheet('slash', 'resource/slash-sprite.png', { frameWidth: number * 3, frameHeight: number * 3 })
        this.load.spritesheet('skeleton', 'resource/skeleton.png', { frameWidth: number, frameHeight: number })

        this.load.image('arrowUp', 'resource/arrow/arrowUp.png')
        this.load.image('arrowDown', 'resource/arrow/arrowDown.png')
        this.load.image('arrowLeft', 'resource/arrow/arrowLeft.png')
        this.load.image('arrowRight', 'resource/arrow/arrowRight.png')

        this.load.image('gladius', 'resource/gladius.png')

        this.load.image('musicOn', 'resource/musicOn.png')
        this.load.image('musicOff', 'resource/musicOff.png')
    }

    create() {
        this.scene.start('game')
    }
}
