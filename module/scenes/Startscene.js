import { createCharacterAnims } from "../CharacterAnims.js"

const startState = {}
export default class Startscene extends Phaser.Scene {
    constructor() {
        super('startscene')
    }
    create() {
        startState.startBackground = this.make.tilemap({ key: 'startBackground'})
        startState.startTileset = startState.startBackground.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles', 16, 16, 1, 2)
        startState.startBackground.createLayer(0, startState.startTileset, 0, 0)
        startState.startBackground.createLayer(1, startState.startTileset, 0, 0)
        startState.startBackground.createLayer(2, startState.startTileset, 0, 0)
    
        startState.startPlayer = this.add.sprite(190, 100, 'slash', 12)
        createCharacterAnims(startState.startPlayer.anims)
        startState.startPlayer.anims.play('slash-down', true)
        this.cameras.main.startFollow(startState.startPlayer).setZoom(2)
    
        startState.startButton = this.add.image(190, 170, 'startbutton').setInteractive().setScale(0.05)
    }
    update() {
        startState.startButton.on('pointerdown', function() {
            startState.startBackground.destroy(),
            startState.startPlayer.destroy(),
            startState.startButton.destroy(),
            this.scene.start('game')
        }, this)
    }
}


// export {start}