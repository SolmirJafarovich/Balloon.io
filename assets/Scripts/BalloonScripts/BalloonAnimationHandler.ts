import { _decorator, Animation, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonAnimationHandler')
export class BalloonAnimationHandler extends Component {

    // Свойство для хранения компонента Animation
    @property(Animation)
    public animation: Animation = null;

    // Метод для запуска анимации по её имени
    play(animationName: string) {
        if (this.animation) {
            this.animation.play(animationName);
        } else {
            console.error("Animation component not found.");
        }
    }

    // Метод для остановки текущей анимации
    stop() {
        if (this.animation) {
            // Останавливаем анимацию, если компонент Animation присутствует
            this.animation.stop();
        }
    }

    // Метод для вызова функции после завершения анимации
    onAnimationEnd(callback: () => void) {
        if (this.animation) {
            this.animation.once(Animation.EventType.FINISHED, callback, this);
        }
    }
}
