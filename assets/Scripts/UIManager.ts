import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    // Main UI node that contains the entire game interface
    @property({
        type: Node
    })
    public userInterface: Node = null;

    // Node for the start game button
    @property({
        type: Node
    })
    public startButton: Node = null;

    // Node containing the user name input interface
    @property({
        type: Node
    })
    public nameInputHub: Node = null;

    // Node for opening the catalog
    @property({
        type: Node
    })
    public catalogOpen: Node = null;

    // Array of death screens to be displayed depending on the cause of death
    @property({
        type: [Node]
    })
    public deathScreens: Node[] = [];

    // Show the start screen with the start button and the option to open the catalog
    showStartScreen() {
        this.userInterface.active = true;
        this.startButton.active = true;
        this.nameInputHub.active = false;  // Hide the name input interface
        this.catalogOpen.active = true;
    }

    // Show the death screen based on the provided code
    showDeathScreen(code: number) {
        if (code >= 0 && code < this.deathScreens.length) {
            this.deathScreens[code].active = true;
        } else {
            console.error("Invalid death screen code: ", code);
        }
    }

    // Hide all screens, including death screens and catalog
    hideAllScreens() {
        this.userInterface.active = false;
        
        // Deactivate all death screens
        for (const deathScreen of this.deathScreens) {
            deathScreen.active = false;
        }

        // Hide the catalog open button
        this.catalogOpen.active = false;
    }
}
