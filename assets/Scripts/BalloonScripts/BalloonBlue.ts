import { _decorator, Animation } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonBlue')
export class BalloonBlue extends BalloonBase {

    // Скорость движения синего шара
    speed = 300;

    // Награда за лопание синего шара
    reward = 1;

    /**
     * Возвращает имя анимации для синего шара
     * @returns Имя анимации
     */
    getAnimationName(): string {
        return 'BlueBlop';
    }
}
