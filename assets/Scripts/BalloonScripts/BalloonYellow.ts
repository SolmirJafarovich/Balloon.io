import { _decorator, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonYellow')
export class BalloonYellow extends BalloonBase {

    // The rising speed of the balloon
    speed = 100;

    // Reward for popping the balloon
    reward = 2;

    /**
     * Returns the animation name for the yellow balloon
     * @returns Name of the animation
     */
    getAnimationName(): string {
        return 'YellowBlop';
    }

    /**
     * Updates the balloon's position every frame
     * @param deltaTime - Time elapsed since the last frame
     */
    update(deltaTime) {

        // Calculate the temporary speed of the balloon
        this.tempSpeed = this.speed * deltaTime;

        // Increase the balloon's speed over time
        this.speed += 1 * deltaTime;

        // Get the current position of the balloon
        this.tempStartLocation = this.balloon.position;

        // Update the balloon's position
        this.tempStartLocation.y += this.tempSpeed;

        // Set the new position of the balloon
        this.balloon.setPosition(this.tempStartLocation);

        // Check if the balloon has gone out of bounds
        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }
}
