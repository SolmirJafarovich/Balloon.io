import { _decorator } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonBlack')
export class BalloonBlack extends BalloonBase {

    speed = 150;
    reward = 0;

    getAnimationName(): string {
        return 'BlackBlop';
    }
    
    protected onPopAnimationFinished(): void {
        if (this.game) {
            this.game.endGame(1);  
        }
        this.returnToPool(); 
    }
    
    protected onBalloonMissed(): void {
        this.returnToPool();
    }
}


