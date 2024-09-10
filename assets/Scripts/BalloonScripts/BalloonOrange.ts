import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonOrange')
export class BalloonOrange extends Component {

    @property({
        type:Number
    })
    speed:number = 100;

    @property({
        type: Node
    })
    public balloon: Node = null;

    @property({
        type: Number
    })
    public reward: number = 1;


    public animation: Animation;
    private audioSource: AudioSource;
    public tempStartLocation:Vec3 = new Vec3(0, 0, 0);

    public tempSpeed:number;

    public balloonExist:boolean = true;

    public game;
    public fell: boolean = false;

    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    onLoad() {

        this.game = find("GameCtrl").getComponent("GameCtrl");

        if (!this.game) {
            console.error("GameCtrl not found");
            return;
        }

        this.initPos();
        this.node.on(Node.EventType.TOUCH_START, this.onTouch, this);

        this.animation = this.getComponent(Animation);

        if (!this.animation) {
            console.error("Animation not found into BalloonOrange");
        }

        this.audioSource = this.getComponent(AudioSource);

        if (!this.audioSource) {
            console.error("AudioSource not found into BalloonOrange");
        }
    }

    onTouch() {
        if (this.balloonExist){
            this.speed = 50;
            this.popBalloon();
            this.balloonExist = false;
        }
    }

    popBalloon(){
        if (this.audioSource) {
            this.audioSource.play(); 
        }
        if (this.animation) {
            this.animation.stop();
            this.animation.play('OrangeBlop');
            this.animation.once(Animation.EventType.FINISHED, this.onPopAnimationFinished, this);
        }
        else{
            this.node.destroy();
        }
    }

    onPopAnimationFinished(){
        if (this.game) this.game.addScore(this.reward);
        this.node.destroy();
    }

    initPos(){
        const randomX = this.randomRange(-view.getVisibleSize().width / 2.2, view.getVisibleSize().width / 2.5);
        this.tempStartLocation = new Vec3(randomX, -view.getVisibleSize().height / 2, 0);

        this.balloon.setPosition(this.tempStartLocation);
    }

    update(deltaTime) {

        this.tempSpeed = this.speed * deltaTime;

        this.tempStartLocation = this.balloon.position;

        this.tempStartLocation.y += this.tempSpeed;

        this.balloon.setPosition(this.tempStartLocation);

        if (this.balloon.position.y > view.getVisibleSize().height * 0.5 && !this.fell) {
            this.speed = -300;
            this.fell = true;
        }
        if (this.balloon.position.y < 0 && this.fell){
            this.speed = 400;
        }

        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }
}


