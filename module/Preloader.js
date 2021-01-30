const preloader = function(game) {
    // if (game)
    var number = 64
    game.load.audio('main_audio', 'https://labs.phaser.io/assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.m4a')
    // gạch trong dungeon
    game.load.image('tiles', 'resource/0x72_DungeonTilesetII_v1.3.1/tileset.png');
    // dungeon map
    game.load.tilemapTiledJSON('dungeon', 'resource/dungeon.json')
    // player
    game.load.spritesheet('player', 'resource/spritesheet.png', { frameWidth: number, frameHeight: number })
    game.load.spritesheet('slash', 'resource/slash-sprite.png', { frameWidth: number * 3, frameHeight: number * 3 })
    game.load.spritesheet('skeleton', 'resource/skeleton.png', { frameWidth: number, frameHeight: number })

    game.load.image('arrowUp', 'resource/arrow/arrowUp.png')
    game.load.image('arrowDown', 'resource/arrow/arrowDown.png')
    game.load.image('arrowLeft', 'resource/arrow/arrowLeft.png')
    game.load.image('arrowRight', 'resource/arrow/arrowRight.png')
}

export {
    preloader
}