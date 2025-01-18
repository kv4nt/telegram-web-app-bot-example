class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.setBaseURL('images');
        this.load.image('sun', 'sun.png');
        this.load.image('sun2', 'sun.png');
        this.load.image('alien', 'space-baddie.png');
    }

    create ()
    {
        this.matter.world.setBounds();

        const alien = this.matter.add.imageStack('alien', null, 0, 500, 50, 2, 0, 0, {
            mass: 1,
            ignorePointer: true
        });

        const sun = this.matter.add.image(600, 200, 'sun', null, {
            shape: {
                type: 'circle',
                radius: 64
            },
            isStatic: true,
            density: 0.00,
            attractors: [
                (bodyA, bodyB) => ({
                    x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                    y: (bodyA.position.y - bodyB.position.y) * 0.000001
                })
            ]
        });

        const sun2 = this.matter.add.image(100, 100, 'sun2', null, {
            isStatic: false,
            density: 0.01,
            shape: {
                type: 'circle',
                radius: 40
            },
            //density: 0.000001,
            //force: { x: -10, y: -10 },
            attractors: [
                (bodyA, bodyB) => ({
                    x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                    y: (bodyA.position.y - bodyB.position.y) * 0.000001
                })
            ]
        });
        const sun3 = this.matter.add.image(400, 500, 'sun2', null, {
            isStatic: true,
            density: 0.00,
            shape: {
                type: 'circle',
                radius: 40
            },
            //density: 0.000001,
            //force: { x: -10, y: -10 },
            attractors: [
                (bodyA, bodyB) => ({
                    x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                    y: (bodyA.position.y - bodyB.position.y) * 0.000001
                })
            ]
        });
        const cat1 = this.matter.world.nextCategory();
        sun2.setCollisionCategory(cat1);
        const cat2 = this.matter.world.nextCategory();
        //alien[0].setCollisionCategory(cat2);
        sun2.setCollidesWith([ cat1, cat2 ]);
        this.matter.add.mouseSpring();
        // this.matter.world.on('collisionstart', (event, sun2, alien) =>
        // {
        //         //console.log(event);
        //     alien.gameObject.destroy();
        //     //sun2.gameObject.setTint(0x00ff00);
        //
        // });
        this.matter.world.on('collisionstart', event =>
        {
            //console.log(event.pairs[0])
            event.pairs[0].bodyB.gameObject.destroy();

        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            debug: {
                       showAxes: true,
                showAngleIndicator: true,
                showPositions: true,
                showSensors: true,
                showCollisions: true,
                showBounds: true,
                showBroadphase: true,
            },
            gravity: {
                scale: 0
            },
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);