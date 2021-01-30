const speed = 100;
const moveUp = function (player, anims, playerDirection) {
        player.setVelocity(0, -speed)
        anims.play('up', true);
        playerDirection = 'up'
}

const moveDown = function (player, anims, playerDirection) {
    player.setVelocity(0, speed)
    anims.play('down', true);
    playerDirection = 'down'
}

const moveLeft = function (player, anims, playerDirection) {
    player.setVelocity(-speed, 0)
    anims.play('left', true);
    playerDirection = 'left'
}

const moveRight = function (player, anims, playerDirection) {
     // cho nhân vật di chuyển
     player.setVelocity(speed, 0)
     // chơi animation khi di chuyển phải
     anims.play('right', true);
     // lưu lại để dùng khi chém
     playerDirection = 'right'
}

export {
    moveDown, moveUp, moveLeft, moveRight
}