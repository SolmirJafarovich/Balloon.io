import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonPink')
export class BalloonPink extends BalloonBase {

    // The rising speed of the pink balloon
    speed = 200;

    // Reward for popping the pink balloon
    reward = 2;

    /**
     * Returns the animation name for the pink balloon
     * @returns Name of the animation
     */
    getAnimationName(): string {
        return 'PinkBlop';
    }

}
