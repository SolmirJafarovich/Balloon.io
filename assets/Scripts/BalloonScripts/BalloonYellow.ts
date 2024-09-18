import { _decorator, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonYellow')
export class BalloonYellow extends BalloonBase {

    // Скорость подъема воздушного шара
    speed = 100;

    // Награда за уничтожение воздушного шара
    reward = 2;

    /**
     * Возвращает имя анимации для желтого воздушного шара
     * @returns Имя анимации
     */
    getAnimationName(): string {
        return 'YellowBlop';
    }

    /**
     * Обновляет положение воздушного шара каждый кадр
     * @param deltaTime - Время, прошедшее с последнего кадра
     */
    update(deltaTime) {

        // Расчет временной скорости движения шара
        this.tempSpeed = this.speed * deltaTime;

        // Увеличение скорости шара с течением времени
        this.speed += 1 * deltaTime;

        // Получение текущего положения шара
        this.tempStartLocation = this.balloon.position;

        // Обновление положения шара
        this.tempStartLocation.y += this.tempSpeed;

        // Установка нового положения шара
        this.balloon.setPosition(this.tempStartLocation);

        // Проверка, вышел ли шар за границы видимой области
        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }
}
