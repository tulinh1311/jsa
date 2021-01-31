import { createCharacterAnims } from "./CharacterAnims.js"

const start = function(game) {
    const startBackground = game.make.tilemap({ key: 'startBackground'})
    const startTileset = startBackground.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles', 16, 16, 1, 2)
    startBackground.createLayer(0, startTileset, 0, 0)
    startBackground.createLayer(1, startTileset, 0, 0)
    startBackground.createLayer(2, startTileset, 0, 0)

    const startPlayer = game.add.sprite(500, 500, 'slash', 12)
    createCharacterAnims(startPlayer.anims)

    const startButton = game.add.text(500, 500, 'START').setInteractive()
    startButton.on('pointerdown', function() {
        startBackground.destroy(),
        startTileset.destroy(),
        startPlayer.destroy(),
        startButton.destroy()
    })
}

// export {start}