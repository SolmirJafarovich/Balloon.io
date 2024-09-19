import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CatalogOpen')
export class CatalogOpen extends Component {

    // Node used to trigger the opening of the catalog
    @property({
        type: Node
    })
    public openNode: Node = null;

    // Node representing the catalog itself
    @property({
        type: Node
    })
    public catalog: Node = null;

    // Node containing the catalog navigation buttons
    @property({
        type: Node
    })
    public navigationButtons: Node = null;

    // Method called when the component is initialized
    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouch, this);
    }

    // Method triggered when a touch event occurs on the node
    onTouch() {
        this.catalog.active = true;
        this.navigationButtons.active = true;
    }
}
