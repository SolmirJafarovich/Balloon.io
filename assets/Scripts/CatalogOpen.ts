import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CatalogOpen')
export class CatalogOpen extends Component {
    @property({
        type: Node
    })
    public openNode: Node = null;

    @property({
        type: Node
    })
    public catalog: Node = null;

    @property({
        type: Node
    })
    public navigationButtons: Node = null;

    onLoad(){
        this.node.on(Node.EventType.TOUCH_START, this.onTouch, this);
    }

    onTouch(){
        this.catalog.active = true;
        this.navigationButtons.active = true;
    }
}


