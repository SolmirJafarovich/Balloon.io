import { _decorator } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonBlack')
export class BalloonBlack extends BalloonBase {

    // Movement speed of the black balloon
    speed = 150;

    // Reward for popping the black balloon (in this case, 0)
    reward = 0;

    /**
     * Returns the animation name for the black balloon
     * @returns Name of the animation
     */
    getAnimationName(): string {
        return 'BlackBlop';
    }

    /**
     * Handler for when the pop animation finishes
     * Ends the game if the black balloon is popped
     */
    protected onPopAnimationFinished(): void {
        if (this.game) {
            this.game.endGame(1);  // Logic for ending the game (loss)
        }
        this.node.destroy();  // Destroys the node when the animation finishes
    }

    /**
     * Handler if the balloon is missed
     * Destroys the node if the balloon is missed
     */
    protected onBalloonMissed(): void {
        this.node.destroy();
    }
}
