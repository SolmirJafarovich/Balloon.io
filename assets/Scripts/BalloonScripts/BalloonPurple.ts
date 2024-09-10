import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonPurple')
export class BalloonPurple extends BalloonBase {

    speed = 210;
    reward = 2;

    public xSpeed;

    playAnimation(): void {
        this.animation.play('PurpleBlop');
    }

    initPos(){
        const randomX = this.randomRange(-view.getVisibleSize().width / 2.5, view.getVisibleSize().width / 4.5);
        this.tempStartLocation = new Vec3(randomX, -view.getVisibleSize().height / 2, 0);

        this.balloon.setPosition(this.tempStartLocation);
    }

    update(deltaTime) {

        this.tempSpeed = this.speed * deltaTime;
        this.xSpeed = Math.sin(this.tempStartLocation.y * deltaTime) * 10 ;

        this.tempStartLocation = this.balloon.position;

        this.tempStartLocation.y += this.tempSpeed;
        this.tempStartLocation.x += this.xSpeed;

        this.balloon.setPosition(this.tempStartLocation);

        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }

}


