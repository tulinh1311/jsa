
const startState = {}
export default class Startscene extends Phaser.Scene {
    constructor() {
        super('startscene')
    }
    create() {
        startState.bg = this.add.image(190, 100, 'bg')
        startState.startBackground = this.make.tilemap({ key: 'startBackground'})
        startState.startTileset = startState.startBackground.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles', 16, 16, 1, 2)
        startState.startBackground.createLayer(0, startState.startTileset, 0, 0)
        startState.startBackground.createLayer(1, startState.startTileset, 0, 0)
        startState.startBackground.createLayer(2, startState.startTileset, 0, 0)
    
        startState.startPlayer = this.add.sprite(190, 120, 'slash', 12)
        startState.startPlayer.anims.create({
            key: 'slash-down',
            frames: this.anims.generateFrameNumbers('slash', { start: 12, end: 17 }),
            frameRate: 30,
            repeat: -1,
            repeatDelay: 300
        });
        startState.startPlayer.anims.play('slash-down', true)
        startState.camera = this.cameras.main.centerOn(190, 80).setZoom(2)
    
        startState.startButton = this.add.image(190, 70, 'startbutton').setInteractive().setScale(0.05)
        startState.logo = this.add.image(190, 30, 'logo').setScale(0.4)
    }
    update() {
        startState.startButton.on('pointerdown', function() {
            this.scene.start('game')
        }, this)
    }
}
