import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonAnimationHandler } from './BalloonAnimationHandler';
import { BalloonAudioHandler } from './BalloonAudioHandler';
const { ccclass, property } = _decorator;

@ccclass('BalloonBase')
export abstract class BalloonBase extends Component {

    @property({
        type:Number
    })
    speed:number = 200;

    @property({
        type: Node
    })
    public balloon: Node = null;

    @property({
        type: Number
    })
    public reward: number = 1;


    protected game;
    public animation: Animation;
    public audioSource: AudioSource;
    public tempStartLocation: Vec3 = new Vec3(0, 0, 0);
    public tempSpeed: number;
    public balloonExist: boolean = true;

    protected animationHandler: BalloonAnimationHandler;
    protected audioHandler: BalloonAudioHandler;

    abstract getAnimationName(): string;

    onLoad() {
        this.game = find("GameCtrl").getComponent("GameCtrl");

        if (!this.game) {
            console.error("GameCtrl not found");
            return;
        }

        this.initPos();

        this.node.on(Node.EventType.TOUCH_START, this.onTouch, this);

        this.animationHandler = this.getComponent(BalloonAnimationHandler);
        if (!this.animationHandler) {
            console.error("animationHandler not found");
            return;
        }

        this.audioHandler = this.getComponent(BalloonAudioHandler);
        if (!this.audioHandler) {
            console.error("audioHandler not found");
            return;
        }
    }

    protected initPos() {
        const randomX = this.randomRange(-view.getVisibleSize().width / 2.2, view.getVisibleSize().width / 2.5);
        this.tempStartLocation = new Vec3(randomX, -view.getVisibleSize().height / 2, 0);

        this.balloon.setPosition(this.tempStartLocation);
    }

    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    onTouch() {
        if (this.balloonExist) {
            this.speed = 50;
            this.popBalloon();
            this.balloonExist = false;
        }
    }

    popBalloon(){
        if (this.audioHandler) {
            this.audioHandler.play();
        }
        if (this.animationHandler) {
            this.animationHandler.stop();
            this.animationHandler.play(this.getAnimationName());
            this.animationHandler.onAnimationEnd(() => this.onPopAnimationFinished());
        } else {
            this.node.destroy();
        }
    }

    protected onPopAnimationFinished(): void {
        if (this.game) this.game.addScore(this.reward);
        this.node.destroy();
    }

    protected update(deltaTime: number) {
        this.tempSpeed = this.speed * deltaTime;
        this.tempStartLocation = this.balloon.position;
        this.tempStartLocation.y += this.tempSpeed;
        this.balloon.setPosition(this.tempStartLocation);

        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.onBalloonMissed();
            
        }
    }

    protected onBalloonMissed(): void {
        // По умолчанию завершает игру
        if (this.game) this.game.endGame(0);
        this.node.destroy();
    }
}


