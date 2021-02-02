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
        repeat: -1,
        repeatDelay: 300
    });
    anims.create({
        key: 'slash-left',
        frames: anims.generateFrameNumbers('slash', { start: 6, end: 11 }),
        frameRate: 30,
        repeat: -1,
        repeatDelay: 300
    });
    anims.create({
        key: 'slash-down',
        frames: anims.generateFrameNumbers('slash', { start: 12, end: 17 }),
        frameRate: 30,
        repeat: -1,
        repeatDelay: 300
    });
    anims.create({
        key: 'slash-right',
        frames: anims.generateFrameNumbers('slash', { start: 18, end: 23 }),
        frameRate: 30,
        repeat: -1,
        repeatDelay: 300
    });
}

const slash = function(player, playerDirection) {
    if (playerDirection == 'right') {
        player.anims.play('slash-right', true); // animation khi chẻm và đang hướng phải
    }
    else if (playerDirection == 'left') { player.anims.play('slash-left', true); }
    else if (playerDirection == 'up') { player.anims.play('slash-up', true); }
    else if (playerDirection == 'down') { player.anims.play('slash-down', true); }
}

export {
    createCharacterAnims,
    slash
}