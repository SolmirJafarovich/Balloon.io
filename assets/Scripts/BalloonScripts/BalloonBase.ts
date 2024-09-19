import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonAnimationHandler } from './BalloonAnimationHandler';
import { BalloonAudioHandler } from './BalloonAudioHandler';
const { ccclass, property } = _decorator;

@ccclass('BalloonBase')
export abstract class BalloonBase extends Component {

    @property({ type: Number })
    speed: number = 200; // Balloon movement speed

    @property({ type: Node })
    public balloon: Node = null; // Balloon node

    @property({ type: Number })
    public reward: number = 1; // Points awarded for popping the balloon

    protected game; // Reference to the game controller
    public animation: Animation; // Balloon animation
    public audioSource: AudioSource; // Balloon audio
    public tempStartLocation: Vec3 = new Vec3(0, 0, 0); // Temporary position of the balloon
    public tempSpeed: number; // Temporary balloon speed
    public balloonExist: boolean = true; // Flag indicating if the balloon still exists

    protected animationHandler: BalloonAnimationHandler; // Animation handler
    protected audioHandler: BalloonAudioHandler; // Audio handler

    // Abstract method to get the balloon's animation name. Implemented in subclasses.
    abstract getAnimationName(): string;

    // Method called when the component is loaded
    onLoad() {
        // Get reference to the game controller
        this.game = find("GameCtrl").getComponent("GameCtrl");

        if (!this.game) {
            console.error("GameCtrl not found");
            return;
        }

        // Initialize balloon position
        this.initPos();

        // Set up touch event handler for the balloon
        this.node.on(Node.EventType.TOUCH_START, this.onTouch, this);

        // Get the animation handler
        this.animationHandler = this.getComponent(BalloonAnimationHandler);
        if (!this.animationHandler) {
            console.error("animationHandler not found");
            return;
        }

        // Get the audio handler
        this.audioHandler = this.getComponent(BalloonAudioHandler);
        if (!this.audioHandler) {
            console.error("audioHandler not found");
            return;
        }
    }

    // Method to initialize the balloon's starting position
    protected initPos() {
        const randomX = this.randomRange(-view.getVisibleSize().width / 2.2, view.getVisibleSize().width / 2.5);
        this.tempStartLocation = new Vec3(randomX, -view.getVisibleSize().height / 2, 0); 

        // Set the balloon's position
        this.balloon.setPosition(this.tempStartLocation);
    }

    // Method to generate a random number between min and max
    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Method called when the balloon is touched
    onTouch() {
        if (this.balloonExist) {
            this.speed = 50;
            this.popBalloon();
            this.balloonExist = false; 
        }
    }

    // Method to handle balloon popping
    popBalloon() {
        if (this.audioHandler) {
            this.audioHandler.play();
        }
        if (this.animationHandler) {
            this.animationHandler.stop(); 
            this.animationHandler.play(this.getAnimationName()); 
            this.animationHandler.onAnimationEnd(() => this.onPopAnimationFinished());
        } else {
            // If there's no animation handler, just destroy the object
            this.node.destroy();
        }
    }

    // Method called when the pop animation is finished
    protected onPopAnimationFinished(): void {
        if (this.game) this.game.addScore(this.reward); 
        this.node.destroy(); 
    }

    // Method to update the balloon's position on screen (called every frame)
    protected update(deltaTime: number) {
        this.tempSpeed = this.speed * deltaTime;
        this.tempStartLocation = this.balloon.position; 
        this.tempStartLocation.y += this.tempSpeed; 
        this.balloon.setPosition(this.tempStartLocation); 

        // Check if the balloon has gone off-screen
        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.onBalloonMissed(); 
        }
    }

    // Method called if the balloon is missed (goes off-screen)
    protected onBalloonMissed(): void {
        if (this.game) this.game.endGame(0);
        this.node.destroy(); 
    }
}
