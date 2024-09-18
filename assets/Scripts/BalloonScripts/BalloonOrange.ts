import { _decorator, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonOrange')
export class BalloonOrange extends BalloonBase {

    // Начальная скорость движения воздушного шара
    speed = 200;

    // Награда за уничтожение оранжевого воздушного шара
    reward = 1;

    // Флаг, указывающий, падал ли воздушный шар
    public fell: boolean = false;

    /**
     * Возвращает имя анимации для оранжевого воздушного шара
     * @returns Имя анимации
     */
    getAnimationName(): string {
        return 'OrangeBlop';
    }

    /**
     * Обновляет положение воздушного шара каждую итерацию кадра
     * @param deltaTime Время, прошедшее с последнего кадра
     */
    update(deltaTime) {

        // Рассчитываем скорость движения шара
        this.tempSpeed = this.speed * deltaTime;

        // Получаем текущее положение шара
        this.tempStartLocation = this.balloon.position;

        // Увеличиваем координату Y для перемещения шара вверх
        this.tempStartLocation.y += this.tempSpeed;

        // Обновляем позицию шара
        this.balloon.setPosition(this.tempStartLocation);

        // Если шар поднимается на высоту экрана, он начинает падать
        if (this.balloon.position.y > view.getVisibleSize().height * 0.5 && !this.fell) {
            this.speed = -300;  // Шар начинает падать
            this.fell = true;   // Отмечаем, что шар упал
        }

        // Если шар падает и достигает середины экрана, он снова начинает подниматься
        if (this.balloon.position.y < 0 && this.fell) {
            this.speed = 400;  // Шар снова поднимается
        }

        // Если шар выходит за верхнюю границу экрана, игра заканчивается
        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }
}
