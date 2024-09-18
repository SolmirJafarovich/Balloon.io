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
        type: Node
    })
    public deathScreen: Node = null;

    @property({
        type: Node
    })
    public deathScreenBlackBalloon: Node = null;

    showStartScreen() {
        this.userInterface.active = true;
        this.startButton.active = true;
        this.nameInputHub.active = false;
        this.catalogOpen.active = true;
    }

    showDeathScreen(code: number) {
        switch (code) {
            case 0:
                this.deathScreen.active = true;
                break;
            case 1:
                this.deathScreenBlackBalloon.active = true;
                break;
        }
    }

    hideAllScreens() {
        this.userInterface.active = false;
        this.deathScreen.active = false;
        this.deathScreenBlackBalloon.active = false;
        this.catalogOpen.active = false;
    }
}

