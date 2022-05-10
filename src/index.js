import Phaser from 'phaser'

import Game from './scenes/Game';
import Game2 from './scenes/Game2';
import GameOver from './scenes/GameOver';

//import './assets/scss/index.scss'

const config = {
    width: 800,
    height: 592,
    parent: 'mario',
    backgroundColor: '#00FFFF',
    title: 'Tilemap',
    url: 'webtips.dev',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 350
            }
        }
    },
    scene: [
        Game,
        Game2,
        GameOver
    ]
};

new Phaser.Game(config);