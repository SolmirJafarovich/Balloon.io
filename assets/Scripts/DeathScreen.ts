import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeathScreen')
export class DeathScreen extends Component {

    // Кнопка для взаимодействия на экране смерти (например, для перезапуска игры)
    @property({
        type: Button
    })
    public deathScreenButton: Button = null;

    // Узел, представляющий сам экран смерти
    @property({
        type: Node
    })
    public deathScreen: Node = null;

    // Главный узел пользовательского интерфейса (UI)
    @property({
        type: Node
    })
    public userInterface: Node = null;

    // Узел кнопки старта игры
    @property({
        type: Node
    })
    public startButton: Node = null;

    // Узел для хаба ввода имени игрока
    @property({
        type: Node
    })
    public nameInputHub: Node = null;

    // Узел для открытия каталога шаров
    @property({
        type: Node
    })
    public catalogOpen: Node = null;

    // Метод, вызываемый при загрузке компонента. Добавляется обработчик клика для кнопки экрана смерти.
    onLoad() {
        this.deathScreenButton.node.on('click', this.onButtonClicked, this);
    }

    // Обработчик клика по кнопке. Скрывает экран смерти и активирует основной интерфейс.
    onButtonClicked() {
        // Скрываем экран смерти
        this.deathScreen.active = false;
        
        // Активируем главный UI
        this.userInterface.active = true;
        
        // Деактивируем кнопку старта
        this.startButton.active = false;

        // Активируем хаб для ввода имени пользователя
        this.nameInputHub.active = true;

        // Активируем возможность открыть каталог шаров
        this.catalogOpen.active = true;
    }
}
