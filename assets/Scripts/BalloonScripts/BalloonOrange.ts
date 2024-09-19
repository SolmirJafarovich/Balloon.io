import { _decorator, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonOrange')
export class BalloonOrange extends BalloonBase {

    // Initial movement speed of the balloon
    speed = 200;

    // Reward for popping the orange balloon
    reward = 1;

    // Flag indicating whether the balloon has started falling
    public fell: boolean = false;

    /**
     * Returns the animation name for the orange balloon
     * @returns Name of the animation
     */
    getAnimationName(): string {
        return 'OrangeBlop';
    }

    /**
     * Updates the balloon's position every frame
     * @param deltaTime Time passed since the last frame
     */
    update(deltaTime) {

        // Calculate the balloon's movement speed
        this.tempSpeed = this.speed * deltaTime;

        // Get the balloon's current position
        this.tempStartLocation = this.balloon.position;

        // Increase the Y coordinate to move the balloon upward
        this.tempStartLocation.y += this.tempSpeed;

        // Update the balloon's position
        this.balloon.setPosition(this.tempStartLocation);

        // If the balloon reaches half the screen height, it starts falling
        if (this.balloon.position.y > view.getVisibleSize().height * 0.5 && !this.fell) {
            this.speed = -300;  // Balloon starts falling
            this.fell = true;   // Mark that the balloon has fallen
        }

        // If the balloon is falling and reaches the middle of the screen, it starts rising again
        if (this.balloon.position.y < 0 && this.fell) {
            this.speed = 400;  // Balloon starts rising again
        }

        // If the balloon moves above the top of the screen, the game ends
        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }
}
