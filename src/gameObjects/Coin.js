class Coin {
    constructor(scene) {
        this.scene = scene;
        // Or you can simply say staticGroup, to make them immovable an not affected by gravity
        this.coins = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        // You could also use the same object layer and differentiate between different objects by custom properties
        const coinObjects = this.scene.map.getObjectLayer('Moneda 1').objects;
        
        for (const coin of coinObjects) {
            this.coins.create(coin.x, coin.y, 'atlas')
            .setOrigin(0)
            .setDepth(-1);
        }
    }

    collideWith(gameObject) {
        this.scene.physics.add.overlap(this.coins, gameObject, this.collect, null, this);

        return this;
    }

    update() {
        for (const coin of this.coins.children.entries) {
            coin.play('rotate', true);
        }
    }

    collect() {
        for (const coin of this.coins.children.entries) {
            if (!coin.body.touching.none) {
                coin.body.setEnable(false);
                this.scene.coin.play();

                this.scene.tweens.add({
                    targets: coin,
                    ease: 'Power1',
                    scaleX: 0,
                    scaleY: 0,
                    duration: 200,
                    onComplete: () => coin.destroy()
                });
            }
        }
        
        this.scene.score+=1;
        this.scene.scoreText.setText('Score: ' + this.scene.score);
    }
}

export default Coin;