import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonGreen')
export class BalloonGreen extends BalloonBase {

    // Movement speed of the green balloon
    speed = 300;

    // Reward for popping the balloon, in this case, negative (-10)
    reward = -10;

    /**
     * Returns the animation name for the green balloon
     * @returns Name of the animation
     */
    getAnimationName(): string {
        return 'GreenBlop';
    }

    /**
     * Called when the balloon is missed (not popped)
     * Destroys the balloon
     */
    protected onBalloonMissed(): void {
        this.node.destroy();
    }
}
