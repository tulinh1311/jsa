import GameScene from "./module/scenes/GameScene.js";
import Preloader from "./module/scenes/Preloader.js";
import Startscene from "./module/scenes/Startscene.js";

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 400 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

// đây là lập nên cái canvas để mình chơi
var config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    input :{
		activePointers:3,
	  },
    scene: [Preloader, Startscene, GameScene],
    scale: {
        zoom: 1.15,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    }
};
var game = new Phaser.Game(config);

