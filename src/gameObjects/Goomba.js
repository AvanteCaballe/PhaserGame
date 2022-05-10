class Goomba {
    constructor(scene) {
        this.scene = scene;
        this.goombas = this.scene.physics.add.group();
        this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.goombas, this.gameOver, null, this);
   

        const goombaObjects = this.scene.map.getObjectLayer('Goomba').objects;

        for (const goomba of goombaObjects) {
            this.goombas.create(goomba.x, goomba.y - goomba.height, 'atlas')
                .setScale(1.5)
                .setOrigin(0)
                .setDepth(1);
        }

        for (const goomba of this.goombas.children.entries) {
            goomba.direction = 'RIGHT';
            goomba.isDed = false;
        }
    }

    collideWith(gameObject) {
        this.scene.physics.add.collider(this.goombas, gameObject);

        return this;
    }

    update() {
        for (const goomba of this.goombas.children.entries) {
            if (goomba.body.blocked.right) {
                goomba.direction = 'LEFT';
            }

            if (goomba.body.blocked.left) {
                goomba.direction = 'RIGHT';
            }

            if (goomba.direction === 'RIGHT') {
                goomba.setVelocityX(100);
            } else {
                goomba.setVelocityX(-100);
            }

            !goomba.isDed && goomba.play('goombaRun', true);
        }
    }

    gameOver() {
        if (this.scene.player.sprite.body.touching.down) {
            this.die();

            return;
        }

        this.scene.player.die();
        this.scene.input.keyboard.shutdown();

        this.scene.physics.world.removeCollider(this.scene.player.collider);
        this.scene.physics.world.removeCollider(this.collider);

        setTimeout(() => {
            if (this.scene.vides == 2) {
                this.scene.scene.start('GameOver', {score: this.scene.score})
            } else {
                if (this.scene.mapa == 1) {
                    this.scene.scene.start('Game', {score: this.scene.score, vides: 
                        this.scene.vides+=1});
                } else if (this.scene.mapa == 2) {
                    this.scene.scene.start('Game2', {score: this.scene.score, vides: this.scene.vides+=1})
                }
            }
        }, 1750);
    }

    die() {
        for (const goomba of this.goombas.children.entries) {
            if (goomba.body.touching.up) {
                goomba.isDed = true;
                goomba.play('goombaDie', true);
                goomba.on('animationcomplete', () => goomba.destroy());

        
                this.scene.score+=2;
                this.scene.scoreText.setText('Score: ' + this.scene.score);

                this.scene.player.sprite.setVelocity(0, -350);
                this.scene.player.sprite.play('jump');
            };
        }
    }
}

export default Goomba;
