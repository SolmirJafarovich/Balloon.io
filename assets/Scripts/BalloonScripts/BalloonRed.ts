import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonRed')
export class BalloonRed extends BalloonBase {

    speed = 200;
    reward = 1;
    
    playAnimation(): void {
        this.animation.play('RedBlop');
    }
}

