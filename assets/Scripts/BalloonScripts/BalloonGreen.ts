import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonGreen')
export class BalloonGreen extends BalloonBase {

    speed = 300;
    reward = -10;

    playAnimation(): void {
        this.animation.play('GreenBlop');
    }

    protected onBalloonMissed(): void {
        this.node.destroy();
    }


}
