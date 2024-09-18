import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CatalogOpen')
export class CatalogOpen extends Component {

    // Узел, который используется для открытия каталога
    @property({
        type: Node
    })
    public openNode: Node = null;

    // Узел, представляющий сам каталог шаров
    @property({
        type: Node
    })
    public catalog: Node = null;

    // Узел с кнопками навигации по каталогу
    @property({
        type: Node
    })
    public navigationButtons: Node = null;

    // Метод, вызываемый при инициализации компонента
    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouch, this);
    }

    // Метод, который вызывается при клике на узел
    onTouch() {
        this.catalog.active = true;
        this.navigationButtons.active = true;
    }
}
