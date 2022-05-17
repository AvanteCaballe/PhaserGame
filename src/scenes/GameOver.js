class GameOver extends Phaser.Scene {
    constructor () {
        super('GameOver');
    }

    preload() {
        this.load.audio('gameover', ['assets/music/gameover.wav']);
		this.load.image('glass-panel', 'assets/img/glassPanel.png')
		this.load.image('cursor-hand', 'assets/img/cursor_hand.png')
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create(data) {
        const { width, height } = this.scale;

        this.game.sound.stopAll();
        this.score = data.score;
        this.cameras.main.setBackgroundColor('#000');
        this.overText = this.add.text(350, 100, 'You Lost!', {fontSize: '24px', fill:'#fff'})
        this.overScore = this.add.text(325, 200, 'Final Score: ' + this.score, {fontSize: '20px', fill: '#fff' });
        this.over = this.sound.add("gameover")
        this.over.play();

        const playButton = this.add.image(width * 0.5, height * 0.8, 'glass-panel')
        .setDisplaySize(150, 50)

        this.add.text(playButton.x, playButton.y, 'Restart?')
            .setOrigin(0.5)

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand');

        playButton.setTint(0x66ff7f);

        this.buttonSelector.x = playButton.x + playButton.displayWidth * 0.5;
        this.buttonSelector.y = playButton.y + 10
    }

    update() {
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
        if (spaceJustPressed) {
            this.over.stop()
            this.scene.start('Game', {restart: true})
            this.scene.stop('GameOver')
        }
    }
}

export default GameOver;