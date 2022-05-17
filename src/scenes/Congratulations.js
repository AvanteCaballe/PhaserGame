class Congratulations extends Phaser.Scene {

    constructor()
    {
        super('Congratulations')
    }

    preload() {
        this.load.audio('victory', ['src/assets/music/victory.wav']);
		this.load.image('glass-panel', 'src/assets/img/glassPanel.png')
		this.load.image('cursor-hand', 'src/assets/img/cursor_hand.png')
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create(data) {
        const { width, height } = this.scale;

        this.game.sound.stopAll();
        this.score = data.score;
        this.vides = data.vides;
        switch (this.vides) {
            case 0:
                this.score += 30;
                break;
            case 1:
                this.score += 20;
                break;
            case 2:
                this.score += 10;
                break;
        }
        this.cameras.main.setBackgroundColor('#000');
        this.overText = this.add.text(350, 100, 'You Won!', {fontSize: '24px', fill:'#fff'})
        this.overScore = this.add.text(325, 200, 'Final Score: ' + this.score, {fontSize: '20px', fill: '#fff' });
        this.over = this.sound.add("victory", {volume: 0.8})
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
            this.scene.stop('Congratulations')
        }
    }
}

export default Congratulations;