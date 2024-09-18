import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonGreen')
export class BalloonGreen extends BalloonBase {

    // Скорость перемещения зеленого шара
    speed = 300;

    // Награда за лопание шара, в данном случае отрицательная (-10)
    reward = -10;

    /**
     * Возвращает имя анимации для зеленого воздушного шара
     * @returns Имя анимации
     */
    getAnimationName(): string {
        return 'GreenBlop';
    }

    /**
     * Вызывается, когда шар не был лопнут и пропущен
     * Уничтожает шар
     */
    protected onBalloonMissed(): void {
        this.node.destroy();
    }
}
