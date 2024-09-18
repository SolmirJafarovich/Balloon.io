import { _decorator, Animation, AudioSource, Component, find, Node, Vec3, view } from 'cc';
import { BalloonAnimationHandler } from './BalloonAnimationHandler';
import { BalloonAudioHandler } from './BalloonAudioHandler';
const { ccclass, property } = _decorator;

@ccclass('BalloonBase')
export abstract class BalloonBase extends Component {

    @property({ type: Number })
    speed: number = 200; // Скорость движения шара

    @property({ type: Node })
    public balloon: Node = null; // Узел шара

    @property({ type: Number })
    public reward: number = 1; // Количество очков за лопание шара

    protected game; // Ссылка на контроллер игры
    public animation: Animation; // Анимация шара
    public audioSource: AudioSource; // Аудио для шара
    public tempStartLocation: Vec3 = new Vec3(0, 0, 0); // Временная позиция шара
    public tempSpeed: number; // Временная скорость шара
    public balloonExist: boolean = true; // Флаг, указывающий, существует ли шар

    protected animationHandler: BalloonAnimationHandler; // Обработчик анимации
    protected audioHandler: BalloonAudioHandler; // Обработчик звуков

    // Абстрактный метод для получения имени анимации шара. Реализуется в дочерних классах.
    abstract getAnimationName(): string;

    // Метод, который вызывается при загрузке компонента
    onLoad() {
        // Получаем ссылку на контроллер игры
        this.game = find("GameCtrl").getComponent("GameCtrl");

        if (!this.game) {
            console.error("GameCtrl not found");
            return;
        }

        // Инициализируем позицию шара
        this.initPos();

        // Назначаем обработчик события касания для шара
        this.node.on(Node.EventType.TOUCH_START, this.onTouch, this);

        // Получаем обработчик анимации
        this.animationHandler = this.getComponent(BalloonAnimationHandler);
        if (!this.animationHandler) {
            console.error("animationHandler not found");
            return;
        }

        // Получаем обработчик звука
        this.audioHandler = this.getComponent(BalloonAudioHandler);
        if (!this.audioHandler) {
            console.error("audioHandler not found");
            return;
        }
    }

    // Метод для инициализации начальной позиции шара
    protected initPos() {
        const randomX = this.randomRange(-view.getVisibleSize().width / 2.2, view.getVisibleSize().width / 2.5);
        this.tempStartLocation = new Vec3(randomX, -view.getVisibleSize().height / 2, 0); 

        // Устанавливаем позицию шара
        this.balloon.setPosition(this.tempStartLocation);
    }

    // Метод для генерации случайного числа в диапазоне от min до max
    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Метод, вызываемый при касании шара
    onTouch() {
        if (this.balloonExist) {
            this.speed = 50;
            this.popBalloon();
            this.balloonExist = false; 
        }
    }

    // Метод для обработки лопания шара
    popBalloon() {
        if (this.audioHandler) {
            this.audioHandler.play();
        }
        if (this.animationHandler) {
            this.animationHandler.stop(); 
            this.animationHandler.play(this.getAnimationName()); 
            this.animationHandler.onAnimationEnd(() => this.onPopAnimationFinished());
        } else {
            // Если обработчика анимации нет, просто уничтожаем объект
            this.node.destroy();
        }
    }

    // Метод, вызываемый по завершению анимации лопания шара
    protected onPopAnimationFinished(): void {
        if (this.game) this.game.addScore(this.reward); 
        this.node.destroy(); 
    }

    // Метод для обновления положения шара на экране (вызывается каждый кадр)
    protected update(deltaTime: number) {
        this.tempSpeed = this.speed * deltaTime;
        this.tempStartLocation = this.balloon.position; 
        this.tempStartLocation.y += this.tempSpeed; 
        this.balloon.setPosition(this.tempStartLocation); 

        // Проверяем, вышел ли шар за пределы экрана
        if (this.balloon.position.y > view.getVisibleSize().height * 1.1) {
            if (this.game) this.onBalloonMissed(); 
        }
    }

    // Метод, вызываемый, если шар пропущен (вышел за экран)
    protected onBalloonMissed(): void {
        if (this.game) this.game.endGame(0);
        this.node.destroy(); 
    }
}
