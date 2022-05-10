class GameOver extends Phaser.Scene {

    constructor () {
        super('GameOver');
    }

    preload() {
        this.load.audio('gameover', ['src/assets/music/gameover.wav']);
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        this.over = this.sound.add("gameover")
        this.over.play();
    }
}

export default GameOver;