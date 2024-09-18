import { _decorator } from 'cc';
import { BalloonBase } from './BalloonBase';
const { ccclass, property } = _decorator;

@ccclass('BalloonBlack')
export class BalloonBlack extends BalloonBase {

    // Скорость движения чёрного шара
    speed = 150;

    // Награда за лопание чёрного шара (в данном случае 0)
    reward = 0;

    /**
     * Возвращает имя анимации для чёрного шара
     * @returns Имя анимации
     */
    getAnimationName(): string {
        return 'BlackBlop';
    }

    /**
     * Обработчик окончания анимации лопания
     * Заканчивает игру, если чёрный шар лопнул
     */
    protected onPopAnimationFinished(): void {
        if (this.game) {
            this.game.endGame(1);  // Логика завершения игры (проигрыш)
        }
        this.node.destroy();  // Уничтожает узел, когда анимация завершена
    }

    /**
     * Обработчик, если шар не был лопнут
     * Уничтожает узел, если шар пропущен
     */
    protected onBalloonMissed(): void {
        this.node.destroy();
    }
}
