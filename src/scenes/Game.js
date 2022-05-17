import Player from "../gameObjects/Player";
import Coin from "../gameObjects/Coin";
import Goomba from "../gameObjects/Goomba";
import generateAnimations from '../config/animations'
import Water from "../gameObjects/Water";
import Pluma from "../gameObjects/Pluma";
var vides = 0;
var score = 0;
class Game extends Phaser.Scene {

    constructor () {
        super('Game');
    }

    preload() {        
        this.load.image('tiles','assets/img/tiles.png');
        this.load.image('pluma', 'assets/img/pluma.png');
        this.load.image('white', 'assets/img/whitespace.png');
        this.load.image('cor', 'assets/img/cor.png');
        this.load.tilemapTiledJSON('map','assets/json/map.json')
        this.load.atlas('atlas', 'assets/img/mario-atlas.png','assets/json/mario-atlas.json');
        this.load.on('complete', () => {
            generateAnimations(this);
        })
        this.load.audio('coin_s', ['assets/music/coin.wav']);
        this.load.audio('level1', ['assets/music/map1.wav']);
        this.load.audio('cape', ['assets/music/cape.wav']);
        this.load.audio('death', ['assets/music/lifelost.wav']);
    }

    create(data) {
        if (this.restart==null && data.restart!=null) {
            this.restart = data.restart
        }

        this.mapa = 1;
        this.map = this.make.tilemap({ key: 'map'});
        this.tileset = this.map.addTilesetImage('tileset', 'tiles');
        this.map.createLayer('Background', this.tileset, 0, 0);
        this.map.createLayer('Fons', this.tileset, 0, 0);
        this.platform = this.map.createLayer('Mapa', this.tileset, 0, 0);
        this.platform.setCollisionByExclusion(-1, true);
        this.door = this.map.createLayer('Porta', this.tileset, 0, 0);
        this.door.setCollisionByExclusion(-1,true)
        this.soundtrack = this.sound.add("level1", {volume: 0.4})
        this.coin = this.sound.add("coin_s", 1)
        this.cape = this.sound.add("cape")
        this.death = this.sound.add("death")



        this.player = new Player(this, 25, 400).collideWith(this.platform);
        this.goombas = new Goomba(this).collideWith(this.platform);
        this.water = new Water(this);
        this.coins = new Coin(this).collideWith(this.player.sprite);
        this.plumes = new Pluma(this).collideWith(this.player.sprite);
        this.inputs = this.input.keyboard.createCursorKeys();
        this.collider = this.physics.add.collider(this.player.sprite, this.door, this.nextLevel, null, this);

        if(this.vides == null) {
            this.vides = vides;
        } else if (this.restart == true) {
            this.vides = 0
        }
        if(this.score == null) {
            this.soundtrack.play()
            this.score = score;
        } else if (this.restart == true) {
            this.soundtrack.play()
            this.score = 0;
            this.restart = false
            this.restart2 = true;
        }

        this.videsText = this.add.text(730, 16, 'Lives: ', { fontSize: '16px', fill: '#000' });
        switch (this.vides) {
            case 0:
                this.vida1 = this.add.image(730, 46, 'cor').setScale(0.075,0.075);
                this.vida2 = this.add.image(755, 46, 'cor').setScale(0.075,0.075);
                this.vida3 = this.add.image(780, 46, 'cor').setScale(0.075,0.075);
                break;
            case 1:
                this.vida1 = this.add.image(730, 46, 'cor').setScale(0.075,0.075);
                this.vida2 = this.add.image(755, 46, 'cor').setScale(0.075,0.075);
                break;
            case 2:
                this.vida1 = this.add.image(730, 46, 'cor').setScale(0.075,0.075);
                this.restart = null
                break;
        }
        this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '16px', fill: '#000' });

    }
    
    update() {
        this.player.update(this.inputs);
        this.goombas.update();
        this.coins.update();
        this.plumes.update();
    }

    nextLevel() {
        this.soundtrack.stop(true)
        this.scene.start('Game2', {score: this.score, vides: this.vides, restart: this.restart2})
        this.scene.stop('Game')
    }
}

export default Game;