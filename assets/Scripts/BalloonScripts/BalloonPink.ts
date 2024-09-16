import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonPink')
export class BalloonPink extends BalloonBase {

    speed = 200;
    reward = 2;

    getAnimationName(): string {
        return 'PinkBlop';
    }

}


