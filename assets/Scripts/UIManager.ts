import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property({
        type: Node
    })
    public userInterface: Node = null;

    @property({
        type: Node
    })
    public startButton: Node = null;

    @property({
        type: Node
    })
    public nameInputHub: Node = null;

    @property({
        type: Node
    })
    public catalogOpen: Node = null;

    @property({
        type: [Node]
    })
    public deathScreens: Node [] = [];

    showStartScreen() {
        this.userInterface.active = true;
        this.startButton.active = true;
        this.nameInputHub.active = false;
        this.catalogOpen.active = true;
    }

    showDeathScreen(code: number) {
        this.deathScreens[code].active = true;
    }

    hideAllScreens() {
        this.userInterface.active = false;
        for (const deathScreen of this.deathScreens) {
            deathScreen.active = false;
        }
        this.catalogOpen.active = false;
    }
}

