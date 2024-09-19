import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonRed')
export class BalloonRed extends BalloonBase {

    // The rising speed of the red balloon
    speed = 200;

    // Reward for popping the red balloon
    reward = 1;

    /**
     * Returns the animation name for the red balloon
     * @returns Name of the animation
     */
    getAnimationName(): string {
        return 'RedBlop';
    }

}
