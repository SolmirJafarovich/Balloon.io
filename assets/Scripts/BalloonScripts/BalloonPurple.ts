import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonPurple')
export class BalloonPurple extends BalloonBase {

    // Скорость подъема пурпурного воздушного шара
    speed = 210;

    // Награда за уничтожение пурпурного воздушного шара
    reward = 2;

    // Скорость перемещения по оси X
    public xSpeed: number;

    /**
     * Возвращает имя анимации для пурпурного воздушного шара
     * @returns Имя анимации
     */
    getAnimationName(): string {
        return 'PurpleBlop';
    }

    /**
     * Инициализирует начальную позицию фиолетового воздушного шара с случайным X
     */
    initPos() {
        // Генерируем случайную позицию по оси X
        const randomX = this.randomRange(-view.getVisibleSize().width / 2.5, view.getVisibleSize().width / 4.5);
        // Устанавливаем начальное положение на оси Y ниже видимой области
        this.tempStartLocation = new Vec3(randomX, -view.getVisibleSize().height / 2, 0);

        this.balloon.setPosition(this.tempStartLocation);
    }

    /**
     * Обновляет позицию фиолетового воздушного шара на каждом кадре
     * @param deltaTime Время, прошедшее с последнего обновления
     */
    update(deltaTime: number) {
        // Вычисляем временное изменение скорости
        this.tempSpeed = this.speed * deltaTime;
        // Вычисляем скорость перемещения по оси X на основе синусоидальной функции
        this.xSpeed = Math.sin(this.tempStartLocation.y * deltaTime) * 10;

        // Обновляем временное положение шара
        this.tempStartLocation = this.balloon.position;
        this.tempStartLocation.y += this.tempSpeed;
        this.tempStartLocation.x += this.xSpeed;

        // Устанавливаем новое положение шара
        this.balloon.setPosition(this.tempStartLocation);

        // Проверяем, вышел ли шар за границы видимой области
        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.game.endGame(0);
            this.node.destroy();
        }
    }

}
