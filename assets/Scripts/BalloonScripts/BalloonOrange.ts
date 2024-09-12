import { _decorator, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonOrange')
export class BalloonOrange extends BalloonBase {

    speed = 200;
    reward = 1;

    public fell:boolean = false;

    getAnimationName(): string {
        return 'OrangeBlop';
    }


    update(deltaTime) {

        this.tempSpeed = this.speed * deltaTime;

        this.tempStartLocation = this.balloon.position;

        this.tempStartLocation.y += this.tempSpeed;

        this.balloon.setPosition(this.tempStartLocation);

        if (this.balloon.position.y > view.getVisibleSize().height * 0.5 && !this.fell) {
            this.speed = -300;
            this.fell = true;
        }
        if (this.balloon.position.y < 0 && this.fell){
            this.speed = 400;
        }

        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }
}


