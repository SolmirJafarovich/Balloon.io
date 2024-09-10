import { _decorator, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonYellow')
export class BalloonYellow extends BalloonBase {

    speed = 100;
    reward = 2;

    playAnimation(): void {
        this.animation.play('YellowBlop');
    }

    update(deltaTime) {

        this.tempSpeed = this.speed * deltaTime;
        this.speed += 1 * deltaTime;

        this.tempStartLocation = this.balloon.position;

        this.tempStartLocation.y += this.tempSpeed;

        this.balloon.setPosition(this.tempStartLocation);

        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }
}


