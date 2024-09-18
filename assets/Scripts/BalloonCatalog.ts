import { _decorator, Button, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonCatalog')
export class BalloonCatalog extends Component {

    // Список префабов воздушных шаров, которые будут отображаться в каталоге
    @property({
        type: [Prefab]
    })
    public balloonPrefabs: Prefab[] = [];

    // Родительский узел, в который будут добавляться шарики
    @property({
        type: Node
    })
    public parentNode: Node = null;

    // Узел с кнопками навигации
    @property({
        type: Node
    })
    public navigationButtons: Node = null;

    // Кнопка для перехода к следующему шару
    @property({
        type: Button
    })
    public nextButton: Button = null;

    // Кнопка для перехода к предыдущему шару
    @property({
        type: Button
    })
    public prevButton: Button = null;

    // Кнопка для выхода из каталога
    @property({
        type: Button
    })
    public exitButton: Button = null;

    // Индекс текущего отображаемого шара
    public currentIdx: number = 0;

    // Текущий отображаемый шар 
    private currentBalloon: Node = null; 

    // Метод, вызываемый при инициализации компонента
    onLoad() {
        this.nextButton.node.on(Button.EventType.CLICK, this.showNextBalloon, this);
        this.prevButton.node.on(Button.EventType.CLICK, this.showPreviousBalloon, this);
        this.exitButton.node.on(Button.EventType.CLICK, this.exitCatalog, this);

        // Отображение первого шара при загрузке
        this.showBalloon(this.currentIdx);
    }

    // Метод для отображения шара по заданному индексу
    showBalloon(index: number) {
        if (this.currentBalloon) {
            this.currentBalloon.destroy();
        }

        // Проверяем, что индекс находится в пределах доступных префабов
        if (index >= 0 && index < this.balloonPrefabs.length) {
            const balloonPrefab = this.balloonPrefabs[index];
            // Создаем новый экземпляр шара и добавляем его в родительский узел
            this.currentBalloon = instantiate(balloonPrefab);
            this.parentNode.addChild(this.currentBalloon);
        }
    }

    // Метод для показа следующего шара
    showNextBalloon() {
        // Увеличиваем индекс, а затем отображаем шар с этим индексом
        this.currentIdx = (this.currentIdx + 1) % this.balloonPrefabs.length;
        this.showBalloon(this.currentIdx);
    }

    // Метод для показа предыдущего шара
    showPreviousBalloon() {
        // Уменьшаем индекс, учитывая количество префабов, затем отображаем шар
        this.currentIdx = (this.currentIdx - 1 + this.balloonPrefabs.length) % this.balloonPrefabs.length;
        this.showBalloon(this.currentIdx);
    }

    // Метод для выхода из каталога (скрытие интерфейса)
    exitCatalog() {
        this.navigationButtons.active = false;
        this.node.active = false;  
    }
}
