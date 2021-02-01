const musicButton = function(game, DEFAULT_HEIGHT, DEFAULT_WIDTH) {
    const musicOn = game.add.image(DEFAULT_WIDTH-60, 20, 'musicOn').setScrollFactor(0, 0).setInteractive().setScale(0.7)
    const musicOff = game.add.image(DEFAULT_WIDTH-60, 20, 'musicOff').setScrollFactor(0, 0). setInteractive().setScale(0.7)
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

const homeButton = function(game, DEFAULT_HEIGHT, DEFAULT_WIDTH) {
    const homeButton = game.add.image(DEFAULT_WIDTH-30, 20, 'homeButton').setScrollFactor(0, 0).setInteractive().setScale(0.7)
    homeButton.on('pointerdown', function() {
        game.scene.start('startscene')
    })
}
export {
    musicButton,
    homeButton
}