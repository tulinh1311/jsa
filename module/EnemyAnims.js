const createSkeletonAnims = function(anims) {
    // skeleton khi di chuyen
    anims.create({
        key: 'skeleton-idle-up',
        frames: anims.generateFrameNumbers('skeleton', { start: 8 * 13, end: 8 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'skeleton-idle-left',
        frames: anims.generateFrameNumbers('skeleton', { start: 9 * 13, end: 9 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'skeleton-idle-down',
        frames: anims.generateFrameNumbers('skeleton', { start: 10 * 13, end: 10 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'skeleton-idle-right',
        frames: anims.generateFrameNumbers('skeleton', { start: 11 * 13, end: 11 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });

    // skeleton khi dam
    anims.create({
        key: 'skeleton-thrust-up',
        frames: anims.generateFrameNumbers('skeleton', { start: 4 * 13, end: 4 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'skeleton-thrust-left',
        frames: anims.generateFrameNumbers('skeleton', { start: 5 * 13, end: 5 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'skeleton-thrust-down',
        frames: anims.generateFrameNumbers('skeleton', { start: 6 * 13, end: 6 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'skeleton-thrust-right',
        frames: anims.generateFrameNumbers('skeleton', { start: 7 * 13, end: 7 * 13 + 7 }),
        frameRate: 10,
        repeat: -1
    });
}

export {
    createSkeletonAnims
}