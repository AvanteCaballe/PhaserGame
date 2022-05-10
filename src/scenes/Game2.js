import Player from "../gameObjects/Player";
import Coin from "../gameObjects/Coin";
import Goomba from "../gameObjects/Goomba";
import generateAnimations from '../config/animations'
import Water from "../gameObjects/Water";

class Game2 extends Phaser.Scene {

    constructor () {
        super('Game2');
    }

    preload() {        
        this.load.image('tiles','src/assets/img/tiles.png');
        this.load.image('white', 'src/assets/img/whitespace.png');
        this.load.image('cor', 'src/assets/img/cor.png');
        this.load.tilemapTiledJSON('map','src/assets/json/map.json')
        this.load.atlas('atlas', 'src/assets/img/mario-atlas.png','src/assets/json/mario-atlas.json');
        this.load.on('complete', () => {
            generateAnimations(this);
        })
        this.load.audio('coin_s', ['src/assets/music/coin.wav']);
        this.load.audio('death', ['src/assets/music/lifelost.wav']);
    }

    create(data) {
        if (this.vides == null) {
            this.vides = data.vides;
        }
        this.videsText = this.add.text(730, 16, 'Vides: ', { fontSize: '16px', fill: '#000' });
        switch (this.vides) {
            case 0:
                this.vida1 = this.add.image(730, 46, 'cor').setScale(0.075,0.075);;
                this.vida2 = this.add.image(755, 46, 'cor').setScale(0.075,0.075);;
                this.vida3 = this.add.image(780, 46, 'cor').setScale(0.075,0.075);;
                break;
            case 1:
                this.vida1 = this.add.image(730, 46, 'cor').setScale(0.075,0.075);;
                this.vida2 = this.add.image(755, 46, 'cor').setScale(0.075,0.075);;
                break;
            case 2:
                this.vida1 = this.add.image(730, 46, 'cor').setScale(0.075,0.075);;
                break;
        }
        if (this.score == null) {
            this.score = data.score;
        }
        this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '16px', fill: '#000' });
        this.mapa = 2;
        this.map = this.make.tilemap({ key: 'map'});
        this.tileset = this.map.addTilesetImage('tileset', 'tiles');
        this.map.createLayer('Fons', this.tileset, 0, 0);
        this.platform = this.map.createLayer('Mapa', this.tileset, 0, 0);
        this.platform.setCollisionByExclusion(-1, true);
        this.door = this.map.createLayer('Porta', this.tileset, 0, 0);
        this.door.setCollisionByExclusion(-1,true)
        this.coin = this.sound.add("coin_s", 1)
        this.death = this.sound.add("death", 4)


        this.player = new Player(this, 25, 400).collideWith(this.platform);
        this.goombas = new Goomba(this).collideWith(this.platform);
        this.water = new Water(this);
        this.coins = new Coin(this).collideWith(this.player.sprite);
        this.inputs = this.input.keyboard.createCursorKeys();
        this.collider = this.physics.add.collider(this.player.sprite, this.door, this.nextLevel, null, this);

    }
    
    update() {
        this.player.update(this.inputs);
        this.goombas.update();
        this.coins.update();
    }

    nextLevel() {
        this.scene.start('GameOver')
    }
}

export default Game2;