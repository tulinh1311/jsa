const preloader = function(game) {
    // if (game)
    var progressBar = game.add.graphics();
            var progressBox = game.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            
            var width = game.cameras.main.width;
            var height = game.cameras.main.height;
            var loadingText = game.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '16px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = game.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '16px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = game.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '16px monospace',
                    fill: '#ffffff'
                }
            });
 
            assetText.setOrigin(0.5, 0.5);
            
            game.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
            });
            
            game.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
 
            game.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
            
    var number = 64
    game.load.audio('main_audio', 'https://labs.phaser.io/assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.m4a')
    game.load.audio('swordSound', 'https://labs.phaser.io/assets/audio/SoundEffects/sword.mp3')
    // gạch trong dungeon
    game.load.image('tiles', 'resource/0x72_DungeonTilesetII_v1.3.1/tileset.png');
    // dungeon map
    game.load.tilemapTiledJSON('dungeon', 'resource/dungeon.json')
    game.load.tilemapTiledJSON('startBackground', 'resource/menu.json')
    // player
    game.load.spritesheet('player', 'resource/spritesheet.png', { frameWidth: number, frameHeight: number })
    game.load.spritesheet('slash', 'resource/slash-sprite.png', { frameWidth: number * 3, frameHeight: number * 3 })
    game.load.spritesheet('skeleton', 'resource/skeleton.png', { frameWidth: number, frameHeight: number })

    game.load.image('arrowUp', 'resource/arrow/arrowUp.png')
    game.load.image('arrowDown', 'resource/arrow/arrowDown.png')
    game.load.image('arrowLeft', 'resource/arrow/arrowLeft.png')
    game.load.image('arrowRight', 'resource/arrow/arrowRight.png')

    game.load.image('gladius', 'resource/gladius.png')

    game.load.image('musicOn', 'resource/musicOn.png')
    game.load.image('musicOff', 'resource/musicOff.png')
}

export {
    preloader
}