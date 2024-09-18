import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonRed')
export class BalloonRed extends BalloonBase {

    // Скорость подъема красного воздушного шара
    speed = 200;

    // Награда за уничтожение красного воздушного шара
    reward = 1;

    /**
     * Возвращает имя анимации для красного воздушного шара
     * @returns Имя анимации
     */
    getAnimationName(): string {
        return 'RedBlop';
    }

}
