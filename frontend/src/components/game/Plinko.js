import Phaser from 'phaser';
// textures
import ball from "@/assets/img/game/ball.png";
import bg from "@/assets/img/game/bg.png";
import pin from "@/assets/img/game/pin.png";
import box_red from "@/assets/img/game/boxes/box_red.png";
import box_ocher from "@/assets/img/game/boxes/box_ocher.png";
import box_orange from "@/assets/img/game/boxes/box_orange.png";
import box_yellow from "@/assets/img/game/boxes/box_yellow.png";
import box_green from "@/assets/img/game/boxes/box_green.png";
import box_light_green from "@/assets/img/game/boxes/box_light_green.png";

export class Plinko {
    constructor(scene) {
        this.width = scene.width;
        this.height = scene.height;
        this.speedDown = 800;
        this.game = new Phaser.Game(this.getConfig(scene));
    }

    getConfig(scene) {
        return {
            type: Phaser.WEBGL,
            canvas: document.getElementById('gameCanvas'),
            width: this.width,
            height: this.height,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: this.speedDown},
                    debug: false,
                }
            },
            scene: scene
        };
    }
}

export class PlinkoScene extends Phaser.Scene {
    constructor(width, height, rows) {
        super("scene-game");
        this.width = width;
        this.height = height;
        //metrics
        this.Xmetric = this.width * 0.075;
        this.Ymetric = this.height * 0.08;
        this.xHalf = this.width / 2;
        this.yStart = [
            this.height * 0.25,
            this.height * 0.2,
            this.height * 0.15,
        ];
        this.yBallStart = this.height * 0.02;
        //pin
        this.pinSize = {
            width: this.width * 0.013,
            height: this.width * 0.013,
        }
        //box
        this.boxSize = {
            width: this.width * 0.075,
            height: this.width * 0.075,
        }
        //boxes containers
        this.texts = [];
        // array of balls
        this.balls = [];
        //ball
        this.ballSize = {
            width: this.width * 0.04,
            height: this.width * 0.04,
        }
        // this.ballSpeedX = this.width * 0.085;
        this.ballSpeedX = this.Xmetric * 0.5;
        // rows
        this.rows = {
            id: rows,
            rows: rows*2+6,
        };
        this.risk = 0
        //riskTable
        this.riskTable = [
            [
                [2.1, 1.1, 1, 0.5, 1, 1.1, 2.1],
                [3, 1.3, 0.7, 0.4, 0.7, 1.3, 3],
                [4, 1.5, 0.3, 0.2, 0.3, 1.5, 4],
            ],
            [
                [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
                [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
                [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29],
            ],
            [
                [5.6, 2.1, 1.1, 1, 0.7, 0.5, 0.7, 1, 1.1, 2.1, 5.6],
                [13, 3, 1.3, 0.9, 0.7, 0.4, 0.7, 0.9, 1.3, 3, 13],
                [29, 4, 1.5, 0.7, 0.3, 0.2, 0.3, 0.7, 1.5, 4, 29],
            ],
        ];
    }

    changePlayStatus(id, isPlaying) {
        const event = new CustomEvent('changePlayStatus', { detail: {
            id: id,
            isPlaying: isPlaying
        } });
        document.dispatchEvent(event);
    }

    preload() {
        this.load.image('ball', ball);
        this.load.image('bg', bg);
        this.load.image('pin', pin);
        this.load.image('box_red', box_red);
        this.load.image('box_ocher', box_ocher);
        this.load.image('box_orange', box_orange);
        this.load.image('box_yellow', box_yellow);
        this.load.image('box_green', box_green);
        this.load.image('box_light_green', box_light_green);
    }

    create() {
        let bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
        bg.displayWidth = this.width;
        bg.displayHeight = this.height;
        this.pins = this.physics.add.staticGroup();
        this.createPins()
        this.boxes = this.physics.add.staticGroup();
        this.createBoxes()
    }

    createPins() {
        this.getPinsPosition().forEach((row) => {
            row.forEach((pinPosition) => {
                let pin = this.pins
                    .create(pinPosition.x, pinPosition.y, "pin")
                    .setOrigin(0.5, 0.5)
                    .refreshBody();
                pin.displayWidth = this.pinSize.width;
                pin.displayHeight = this.pinSize.height;
                pin.body.updateFromGameObject();
            });
        });
    }
    updatePins(rows) {
        this.pins.clear(true, true);
        this.texts.forEach(text => text.destroy());
        this.texts = [];
        this.boxes.clear(true, true);
        this.rows = {
            id: rows,
            rows: rows*2+6,
        };
        this.createPins();
        this.createBoxes();
    }

    createBoxes() {
        this.getBoxes().forEach(box => {
            let Box = this.boxes.create(box.x, box.y, box.texture)
                .setOrigin(0.5, 0.5)
                .refreshBody();
            Box.displayWidth = this.boxSize.width;
            Box.displayHeight = this.boxSize.height;
            Box.body.updateFromGameObject();

            let text = this.add.text(box.x, box.y, box.text, {
                fontSize: '10px',
                fill: '#FFF',
                fontFamily: 'Nunito',
                align: 'center'
            }).setOrigin(0.5, 0.5);

            this.texts.push(text);
        });
    }

    updateBoxes(risk) {
        this.texts.forEach(text => text.destroy());
        this.texts = [];
        this.boxes.clear(true, true);
        this.risk = risk;
        this.createBoxes();
    }

    createBall(id, result) {
        let results = [];
        for (let i = 0; i < this.riskTable[this.rows.id][this.risk].length; i++) {
            if (this.riskTable[this.rows.id][this.risk][i] === result) {
                results.push(i);
            }
        }
        let boxIndex = results[Math.floor(Math.random() * results.length)];
        let boxes = this.getBoxes();
        let box = boxes[boxIndex];
        let finalX = box.x;
        this.balls[id] = this.physics.add.sprite(this.xHalf, this.yBallStart, 'ball');
        this.balls[id].id = id;
        this.balls[id].displayWidth = this.ballSize.width;
        this.balls[id].displayHeight = this.ballSize.height;
        this.balls[id].setBounce(0.5);
        this.balls[id].setCollideWorldBounds(true);

        let usedPins = [];
        this.physics.add.collider(this.balls[id], this.pins, (ball, pin) => {
            if (!usedPins.includes(pin)) {
                if (this.balls[id].x >= finalX) {
                    this.balls[id].setVelocityX(-this.ballSpeedX);
                } else {
                    this.balls[id].setVelocityX(this.ballSpeedX);
                }
                usedPins.push(pin);
            }
        });

        this.physics.add.overlap(this.balls[id], this.boxes, () => {
            id = this.balls[id].id;
            this.balls[id].destroy();
            this.changePlayStatus(id, false);
        });
    }

    update() {
        // Game loop logic here
    }

    getPinsPosition() {
        return [
            //первая строка
            [
                {x: this.xHalf - 1 * this.Xmetric, y: this.yStart[this.rows.id]},
                {x: this.xHalf + 0 * this.Xmetric, y: this.yStart[this.rows.id]},
                {x: this.xHalf + 1 * this.Xmetric, y: this.yStart[this.rows.id]},
            ],
            //вторая строка
            [
                {x: this.xHalf - 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + this.Ymetric},
                {x: this.xHalf - 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + this.Ymetric},
                {x: this.xHalf + 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + this.Ymetric},
                {x: this.xHalf + 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + this.Ymetric},
            ],
            //третья строка
            [
                {x: this.xHalf - 2 * this.Xmetric, y: this.yStart[this.rows.id] + 2 * this.Ymetric},
                {x: this.xHalf - 1 * this.Xmetric, y: this.yStart[this.rows.id] + 2 * this.Ymetric},
                {x: this.xHalf + 0 * this.Xmetric, y: this.yStart[this.rows.id] + 2 * this.Ymetric},
                {x: this.xHalf + 1 * this.Xmetric, y: this.yStart[this.rows.id] + 2 * this.Ymetric},
                {x: this.xHalf + 2 * this.Xmetric, y: this.yStart[this.rows.id] + 2 * this.Ymetric},
            ],
            //четвертая строка
            [
                {x: this.xHalf - 2.5 * this.Xmetric, y: this.yStart[this.rows.id] + 3 * this.Ymetric},
                {x: this.xHalf - 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + 3 * this.Ymetric},
                {x: this.xHalf - 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + 3 * this.Ymetric},
                {x: this.xHalf + 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + 3 * this.Ymetric},
                {x: this.xHalf + 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + 3 * this.Ymetric},
                {x: this.xHalf + 2.5 * this.Xmetric, y: this.yStart[this.rows.id] + 3 * this.Ymetric},
            ],
            //пятая строка
            [
                {x: this.xHalf - 3 * this.Xmetric, y: this.yStart[this.rows.id] + 4 * this.Ymetric},
                {x: this.xHalf - 2 * this.Xmetric, y: this.yStart[this.rows.id] + 4 * this.Ymetric},
                {x: this.xHalf - 1 * this.Xmetric, y: this.yStart[this.rows.id] + 4 * this.Ymetric},
                {x: this.xHalf + 0 * this.Xmetric, y: this.yStart[this.rows.id] + 4 * this.Ymetric},
                {x: this.xHalf + 1 * this.Xmetric, y: this.yStart[this.rows.id] + 4 * this.Ymetric},
                {x: this.xHalf + 2 * this.Xmetric, y: this.yStart[this.rows.id] + 4 * this.Ymetric},
                {x: this.xHalf + 3 * this.Xmetric, y: this.yStart[this.rows.id] + 4 * this.Ymetric},
            ],
            //шестая строка
            [
                {x: this.xHalf - 3.5 * this.Xmetric, y: this.yStart[this.rows.id] + 5 * this.Ymetric},
                {x: this.xHalf - 2.5 * this.Xmetric, y: this.yStart[this.rows.id] + 5 * this.Ymetric},
                {x: this.xHalf - 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + 5 * this.Ymetric},
                {x: this.xHalf - 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + 5 * this.Ymetric},
                {x: this.xHalf + 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + 5 * this.Ymetric},
                {x: this.xHalf + 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + 5 * this.Ymetric},
                {x: this.xHalf + 2.5 * this.Xmetric, y: this.yStart[this.rows.id] + 5 * this.Ymetric},
                {x: this.xHalf + 3.5 * this.Xmetric, y: this.yStart[this.rows.id] + 5 * this.Ymetric},
            ],
            //седьмая строка
            [
                {x: this.xHalf - 4 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
                {x: this.xHalf - 3 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
                {x: this.xHalf - 2 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
                {x: this.xHalf - 1 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
                {x: this.xHalf + 0 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
                {x: this.xHalf + 1 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
                {x: this.xHalf + 2 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
                {x: this.xHalf + 3 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
                {x: this.xHalf + 4 * this.Xmetric, y: this.yStart[this.rows.id] + 6 * this.Ymetric},
            ],
            //восьмая строка
            [
                {x: this.xHalf - 4.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf - 3.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf - 2.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf - 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf - 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf + 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf + 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf + 2.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf + 3.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
                {x: this.xHalf + 4.5 * this.Xmetric, y: this.yStart[this.rows.id] + 7 * this.Ymetric},
            ],
            //девятая строка
            [
                {x: this.xHalf - 5 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf - 4 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf - 3 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf - 2 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf - 1 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf + 0 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf + 1 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf + 2 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf + 3 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf + 4 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
                {x: this.xHalf + 5 * this.Xmetric, y: this.yStart[this.rows.id] + 8 * this.Ymetric},
            ],
            //десятая строка
            [
                {x: this.xHalf - 5.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf - 4.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf - 3.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf - 2.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf - 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf - 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf + 0.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf + 1.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf + 2.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf + 3.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf + 4.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
                {x: this.xHalf + 5.5 * this.Xmetric, y: this.yStart[this.rows.id] + 9 * this.Ymetric},
            ],
        ].slice(0, this.rows.rows);
    }

    getBoxes() {
        if (this.rows.rows === 6) {
            return [
                {x: this.xHalf - 3 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_green', text: `${this.riskTable[this.rows.id][this.risk][0]}x`},
                {x: this.xHalf - 2 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_yellow', text: `${this.riskTable[this.rows.id][this.risk][1]}x`},
                {x: this.xHalf - 1 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_orange', text: `${this.riskTable[this.rows.id][this.risk][2]}x`},
                {x: this.xHalf + 0 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_red', text: `${this.riskTable[this.rows.id][this.risk][3]}x`},
                {x: this.xHalf + 1 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_orange', text: `${this.riskTable[this.rows.id][this.risk][4]}x`},
                {x: this.xHalf + 2 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_yellow', text: `${this.riskTable[this.rows.id][this.risk][5]}x`},
                {x: this.xHalf + 3 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_green', text: `${this.riskTable[this.rows.id][this.risk][6]}x`},
            ];
        }
        if (this.rows.rows === 8) {
            return [
                {x: this.xHalf - 4 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_green', text: `${this.riskTable[this.rows.id][this.risk][0]}x`},
                {x: this.xHalf - 3 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_yellow', text: `${this.riskTable[this.rows.id][this.risk][1]}x`},
                {x: this.xHalf - 2 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_orange', text: `${this.riskTable[this.rows.id][this.risk][2]}x`},
                {x: this.xHalf - 1 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_ocher', text: `${this.riskTable[this.rows.id][this.risk][3]}x`},
                {x: this.xHalf + 0 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_red', text: `${this.riskTable[this.rows.id][this.risk][4]}x`},
                {x: this.xHalf + 1 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_ocher', text: `${this.riskTable[this.rows.id][this.risk][5]}x`},
                {x: this.xHalf + 2 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_orange', text: `${this.riskTable[this.rows.id][this.risk][6]}x`},
                {x: this.xHalf + 3 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_yellow', text: `${this.riskTable[this.rows.id][this.risk][7]}x`},
                {x: this.xHalf + 4 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_green', text: `${this.riskTable[this.rows.id][this.risk][8]}x`},
            ];
        }
        if (this.rows.rows === 10) {
            return [
                {x: this.xHalf - 5 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_light_green', text: `${this.riskTable[this.rows.id][this.risk][0]}x`},
                {x: this.xHalf - 4 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_green', text: `${this.riskTable[this.rows.id][this.risk][1]}x`},
                {x: this.xHalf - 3 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_yellow', text: `${this.riskTable[this.rows.id][this.risk][2]}x`},
                {x: this.xHalf - 2 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_orange', text: `${this.riskTable[this.rows.id][this.risk][3]}x`},
                {x: this.xHalf - 1 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_ocher', text: `${this.riskTable[this.rows.id][this.risk][4]}x`},
                {x: this.xHalf + 0 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_red', text: `${this.riskTable[this.rows.id][this.risk][5]}x`},
                {x: this.xHalf + 1 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_ocher', text: `${this.riskTable[this.rows.id][this.risk][6]}x`},
                {x: this.xHalf + 2 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_orange', text: `${this.riskTable[this.rows.id][this.risk][7]}x`},
                {x: this.xHalf + 3 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_yellow', text: `${this.riskTable[this.rows.id][this.risk][8]}x`},
                {x: this.xHalf + 4 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_green', text: `${this.riskTable[this.rows.id][this.risk][9]}x`},
                {x: this.xHalf + 5 * this.Xmetric, y: this.yStart[this.rows.id] + this.rows.rows * this.Ymetric, texture: 'box_light_green', text: `${this.riskTable[this.rows.id][this.risk][10]}x`},
            ];
        }
    }
}