
class Pluma {
    constructor(scene) {
        this.scene = scene;
        // Or you can simply say staticGroup, to make them immovable an not affected by gravity
        this.plumes = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        // You could also use the same object layer and differentiate between different objects by custom properties
        const plumaObjects = this.scene.map.getObjectLayer('Plumes').objects;
        
        for (const pluma of plumaObjects) {
            this.plumes.create(pluma.x, pluma.y, 'pluma')
            .setOrigin(0)
            .setDepth(2);
        }
    }

    collideWith(gameObject) {
        this.scene.physics.add.overlap(this.plumes, gameObject, this.collect, null, this);

        return this;
    }

    update() {
    }

    collect() {
        for (const pluma of this.plumes.children.entries) {
            if (!pluma.body.touching.none) {
                pluma.body.setEnable(false);
                this.scene.cape.play();

                this.scene.tweens.add({
                    targets: pluma,
                    ease: 'Power1',
                    scaleX: 0,
                    scaleY: 0,
                    duration: 200,
                    onComplete: () => pluma.destroy()
                });
            }
        }
        
        this.scene.score+=5;
        this.scene.scoreText.setText('Score: ' + this.scene.score);
    }
}

export default Pluma;