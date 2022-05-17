import Phaser from 'phaser'
class MainMenu extends Phaser.Scene
{
    buttons = [];
    selectedButtonIndex = 0;
	constructor()
	{
		super('main-menu')
	}

	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	preload()
    {
		this.load.image('glass-panel', 'src/assets/img/glassPanel.png')
		this.load.image('cursor-hand', 'src/assets/img/cursor_hand.png')
        this.load.audio('prelude', ['src/assets/music/mainmenu.wav']);
    }

    create()
    {
        this.url = "https://github.com/AvanteCaballe/PhaserGame"
		const { width, height } = this.scale;
        
        this.mainText = this.add.text(300, 100, 'Phaser Mario', {fontSize: '28px', fill:'#fff'})

        const playButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel')
        .setDisplaySize(150, 50)

        this.add.text(playButton.x, playButton.y, 'Play')
            .setOrigin(0.5)

        const creditsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass-panel')
            .setDisplaySize(150, 50)

        this.add.text(creditsButton.x, creditsButton.y, 'Credits')
            .setOrigin(0.5)

        this.mainmenu = this.sound.add("prelude", {volume: 0.5});
        this.mainmenu.play()
        this.buttons.push(playButton)
	    this.buttons.push(creditsButton)

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand');


        playButton.on('selected', () => {
            this.scene.start('Game')
            this.mainmenu.stop()
        })
    
        creditsButton.on('selected', () => {
            this.s = window.open(this.url, '_blank');
            this.s.focus;
        })

        this.selectButton(0)
	}

	selectButton(index)
	{
		this.currentButton = this.buttons[this.selectedButtonIndex]

        this.currentButton.setTint(0xffffff);

        this.button = this.buttons[index]

        this.selectedButtonIndex = index

        this.buttonSelector.x = this.button.x + this.button.displayWidth * 0.5;
        this.buttonSelector.y = this.button.y + 10

        this.button.setTint(0x66ff7f)
	}

	selectNextButton(change = 1)
	{
		let index = this.selectedButtonIndex + change;

        if (index >= this.buttons.length) {
            index = 0;
        } else if (index < 0) {
            index = this.buttons.length - 1
        }
        this.selectButton(index)
	}

	confirmSelection()
	{
		const button = this.buttons[this.selectedButtonIndex]

        button.emit('selected')
	}
	
	update()
	{
		const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
		const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
		
		if (upJustPressed)
		{
			this.selectNextButton(-1)
		}
		else if (downJustPressed)
		{
			this.selectNextButton(1)
		}
		else if (spaceJustPressed)
		{
			this.confirmSelection()
		}
	}
}

export default MainMenu;