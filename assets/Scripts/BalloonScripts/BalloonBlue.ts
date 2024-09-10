import { _decorator, Animation } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonBlue')
export class BalloonBlue extends BalloonBase {

    speed = 300;
    reward = 1;

    playAnimation(): void {
        this.animation.play('BlueBlop');
    }
}


