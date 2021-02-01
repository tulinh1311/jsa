const createCharacterAnims = function (anims) {
    anims.create({
        key: 'up',
        frames: anims.generateFrameNumbers('player', { start: 192, end: 200 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'left',
        frames: anims.generateFrameNumbers('player', { start: 216, end: 224 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'down',
        frames: anims.generateFrameNumbers('player', { start: 240, end: 248 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'right',
        frames: anims.generateFrameNumbers('player', { start: 264, end: 272 }),
        frameRate: 10,
        repeat: -1
    });
    // khi chém
    anims.create({
        key: 'slash-up',
        frames: anims.generateFrameNumbers('slash', { start: 0, end: 5 }),
        frameRate: 30,
        repeat: 1
    });
    anims.create({
        key: 'slash-left',
        frames: anims.generateFrameNumbers('slash', { start: 6, end: 11 }),
        frameRate: 30,
        repeat: 1
    });
    anims.create({
        key: 'slash-down',
        frames: anims.generateFrameNumbers('slash', { start: 12, end: 17 }),
        frameRate: 30,
        repeat: -1
    });
    anims.create({
        key: 'slash-right',
        frames: anims.generateFrameNumbers('slash', { start: 18, end: 23 }),
        frameRate: 30,
        repeat: 1
    });
}

const slash = function(playerDirection, anims) {
    if (playerDirection == 'right') {
        anims.play('slash-right', true); // animation khi chẻm và đang hướng phải
    }
    else if (playerDirection == 'left') { anims.play('slash-left', true); }
    else if (playerDirection == 'up') { anims.play('slash-up', true); }
    else if (playerDirection == 'down') { anims.play('slash-down', true); }
}

export {
    createCharacterAnims,
    slash
}

// if (gameState.cursors.right.isDown || goRight) {
//     moveRight(gameState.player, gameState.player.anims, playerDirection)
// }
// else if (gameState.cursors.left.isDown || goLeft) {
//     moveLeft(gameState.player, gameState.player.anims, playerDirection)
// }
// else if (gameState.cursors.up.isDown || goUp) {
//     moveUp(gameState.player, gameState.player.anims, playerDirection)
// }
// else if (gameState.cursors.down.isDown || goDown) {
//     moveDown(gameState.player, gameState.player.anims, playerDirection)
// }
// else if (gameState.cursors.space.isDown) { slash()}
// else {
//     // không hoạt động gì
//     gameState.player.anims.stop()
//     gameState.player.setVelocity(0, 0)
// }
// gameState.skeleton.anims.play("skeleton-thrust-right", true)
// // buttonUp(gameState.arrowUp, gameState.player, gameState.player.anims, playerDirection)