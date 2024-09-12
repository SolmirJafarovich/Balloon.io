import { _decorator, Animation, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonAnimationHandler')
export class BalloonAnimationHandler extends Component {

    @property(Animation)
    public animation: Animation = null;

    play(animationName: string) {
        if (this.animation) {
            this.animation.play(animationName);
        } else {
            console.error("Animation component not found.");
        }
    }

    stop() {
        if (this.animation) {
            this.animation.stop();
        }
    }

    onAnimationEnd(callback: () => void) {
        if (this.animation) {
            this.animation.once(Animation.EventType.FINISHED, callback, this);
        }
    }
}

