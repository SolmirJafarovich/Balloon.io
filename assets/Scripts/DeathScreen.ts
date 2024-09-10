import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeathScreen')
export class DeathScreen extends Component {

    @property({
        type:Button
    })
    public deathScreenButton: Button = null;

    @property({
        type:Node
    })
    public deathScreen: Node = null;

    @property({
        type:Node
    })
    public userInterface: Node = null;

    @property({
        type:Node
    })
    public startButton: Node = null;

    @property({
        type:Node
    })
    public nameInputHub: Node = null;

    @property({
        type:Node
    })
    public catalogOpen: Node = null;


    onLoad(){
        this.deathScreenButton.node.on('click', this.onButtonClicked, this);
    }

    onButtonClicked(){
        this.deathScreen.active = false;
        this.userInterface.active = true;
        this.startButton.active = false;
        this.nameInputHub.active = true;
        this.catalogOpen.active = true;
    }
}


