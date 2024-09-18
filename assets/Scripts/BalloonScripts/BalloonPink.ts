import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonPink')
export class BalloonPink extends BalloonBase {

    // Скорость подъема розового воздушного шара
    speed = 200;

    // Награда за уничтожение розового воздушного шара
    reward = 2;

    /**
     * Возвращает имя анимации для розового воздушного шара
     * @returns Имя анимации
     */
    getAnimationName(): string {
        return 'PinkBlop';
    }

}
