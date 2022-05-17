import Phaser from 'phaser'
import Congratulations from './scenes/Congratulations';

import Game from './scenes/Game';
import Game2 from './scenes/Game2';
import GameOver from './scenes/GameOver';
import MainMenu from './scenes/MainMenu';

//import './assets/scss/index.scss'

const config = {
    width: 800,
    height: 592,
    parent: 'mario',
    backgroundColor: '#696969',
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
        MainMenu,
        Game,
        Game2,
        GameOver,
        Congratulations
    ]
};

new Phaser.Game(config);