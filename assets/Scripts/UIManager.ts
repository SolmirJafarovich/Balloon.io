import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    // Главный UI-узел, который содержит весь интерфейс игры
    @property({
        type: Node
    })
    public userInterface: Node = null;

    // Узел для кнопки старта игры
    @property({
        type: Node
    })
    public startButton: Node = null;

    // Узел, содержащий интерфейс для ввода имени пользователя
    @property({
        type: Node
    })
    public nameInputHub: Node = null;

    // Узел для открытия каталога
    @property({
        type: Node
    })
    public catalogOpen: Node = null;

    // Массив экранов смерти для отображения при завершении игры (могут быть разные экраны в зависимости от причины смерти)
    @property({
        type: [Node]
    })
    public deathScreens: Node[] = [];

    // Показ стартового экрана с кнопкой старта и возможностью открыть каталог
    showStartScreen() {
        this.userInterface.active = true;
        this.startButton.active = true;
        this.nameInputHub.active = false;  // Прячем интерфейс ввода имени
        this.catalogOpen.active = true;
    }

    // Показ экрана смерти в зависимости от переданного кода
    showDeathScreen(code: number) {
        this.deathScreens[code].active = true;
    }

    // Скрыть все экраны, включая экраны смерти и каталог
    hideAllScreens() {
        this.userInterface.active = false;
        
        // Деактивация всех экранов смерти
        for (const deathScreen of this.deathScreens) {
            deathScreen.active = false;
        }

        // Прячем кнопку открытия каталога
        this.catalogOpen.active = false;
    }
}
