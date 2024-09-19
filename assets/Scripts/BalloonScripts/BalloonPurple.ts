import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonPurple')
export class BalloonPurple extends BalloonBase {

    // The rising speed of the purple balloon
    speed = 210;

    // Reward for popping the purple balloon
    reward = 2;

    // Speed of movement along the X-axis
    public xSpeed: number;

    /**
     * Returns the animation name for the purple balloon
     * @returns Name of the animation
     */
    getAnimationName(): string {
        return 'PurpleBlop';
    }

    /**
     * Initializes the starting position of the purple balloon with a random X value
     */
    initPos() {
        // Generate a random position along the X-axis
        const randomX = this.randomRange(-view.getVisibleSize().width / 2.5, view.getVisibleSize().width / 4.5);
        // Set the initial Y position below the visible area
        this.tempStartLocation = new Vec3(randomX, -view.getVisibleSize().height / 2, 0);

        this.balloon.setPosition(this.tempStartLocation);
    }

    /**
     * Updates the position of the purple balloon every frame
     * @param deltaTime Time since the last update
     */
    update(deltaTime: number) {
        // Calculate the temporary speed change
        this.tempSpeed = this.speed * deltaTime;
        // Calculate movement speed along the X-axis based on a sine function
        this.xSpeed = Math.sin(this.tempStartLocation.y * deltaTime) * 10;

        // Update the temporary position of the balloon
        this.tempStartLocation = this.balloon.position;
        this.tempStartLocation.y += this.tempSpeed;
        this.tempStartLocation.x += this.xSpeed;

        // Set the new position of the balloon
        this.balloon.setPosition(this.tempStartLocation);

        // Check if the balloon has moved outside the visible area
        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }

}
