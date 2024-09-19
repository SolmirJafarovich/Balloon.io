import { _decorator, Animation } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonBlue')
export class BalloonBlue extends BalloonBase {

    // Movement speed of the blue balloon
    speed = 300;

    // Reward for popping the blue balloon
    reward = 1;

    /**
     * Returns the animation name for the blue balloon
     * @returns Name of the animation
     */
    getAnimationName(): string {
        return 'BlueBlop';
    }
}
