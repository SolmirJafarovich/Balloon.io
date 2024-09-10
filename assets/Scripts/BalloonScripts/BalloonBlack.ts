import { _decorator, Animation } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonBlack')
export class BalloonBlack extends BalloonBase {

    speed = 150;
    reward = 0;

    playAnimation(): void {
        this.animation.play('BlackBlop');
    }

    protected onPopAnimationFinished(): void {
        if (this.game) {
            this.game.endGame(1);  
        }
        this.node.destroy();  
    }

    protected onBalloonMissed(): void {
        this.node.destroy();
    }
}


