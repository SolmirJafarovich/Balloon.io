import { _decorator, Animation, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonAnimationHandler')
export class BalloonAnimationHandler extends Component {

    // Property to store the Animation component
    @property(Animation)
    public animation: Animation = null;

    // Method to start an animation by its name
    play(animationName: string) {
        if (this.animation) {
            this.animation.play(animationName);
        } else {
            console.error("Animation component not found.");
        }
    }

    // Method to stop the current animation
    stop() {
        if (this.animation) {
            this.animation.stop();
        }
    }

    // Method to call a function after the animation finishes
    onAnimationEnd(callback: () => void) {
        if (this.animation) {
            this.animation.once(Animation.EventType.FINISHED, callback, this);
        }
    }
}
