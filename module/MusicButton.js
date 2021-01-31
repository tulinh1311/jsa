const musicButton = function(game, DEFAULT_HEIGHT, DEFAULT_WIDTH) {
    const musicOn = game.add.image(DEFAULT_WIDTH-30, 20, 'musicOn').setScrollFactor(0, 0).setInteractive().setScale(0.7)
    const musicOff = game.add.image(DEFAULT_WIDTH-30, 20, 'musicOff').setScrollFactor(0, 0). setInteractive().setScale(0.7)
    musicOff.visible = false
    musicOn.on('pointerdown', function() {
        game.sound.mute = true
        musicOff.visible = true
        musicOn.visible = false
    })
    musicOff.on('pointerdown', function() {
        game.sound.mute = false
        musicOn.visible = true
        musicOff.visible = false
    })
}

export {
    musicButton
}