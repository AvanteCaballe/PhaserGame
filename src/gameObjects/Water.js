class Water {
    constructor(scene) {
        this.scene = scene;

        this.aigua = this.scene.map.createLayer('Aigua', scene.tileset, 0, 0);

        this.aigua.setCollisionByExclusion(-1, true);

        this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.aigua, this.gameOver, null, this);

        
    }

    gameOver() {
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
        }, 2750);
    }
}

export default Water;