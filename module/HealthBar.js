const healthBar = function(game) {
    const baseBar = game.add.graphics();
    baseBar.fillRoundedRect(10, 10, 200, 20, 5);
    baseBar.fillStyle(0x2bc213)
    baseBar.setScrollFactor(0, 0)

    const bloodBar = game.add.graphics();
    bloodBar.fillRoundedRect(10, 10, 200, 20, 5);
    bloodBar.fillStyle(0x808080)
    bloodBar.setScrollFactor(0, 0)

    const healthText = game.add.text(13, 13, '100/100', { fill: '#fff' })
    healthText.setScrollFactor(0, 0)
}

export {
    healthBar
}