import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeathScreen')
export class DeathScreen extends Component {

    // Button for interaction on the death screen (e.g., to restart the game)
    @property({
        type: Button
    })
    public deathScreenButton: Button = null;

    // Node representing the death screen itself
    @property({
        type: Node
    })
    public deathScreen: Node = null;

    // Main UI node
    @property({
        type: Node
    })
    public userInterface: Node = null;

    // Node for the start game button
    @property({
        type: Node
    })
    public startButton: Node = null;

    // Node for the player name input hub
    @property({
        type: Node
    })
    public nameInputHub: Node = null;

    // Node for opening the balloon catalog
    @property({
        type: Node
    })
    public catalogOpen: Node = null;

    // Method called when the component is loaded. Adds a click handler for the death screen button.
    onLoad() {
        this.deathScreenButton.node.on('click', this.onButtonClicked, this);
    }

    // Click handler for the button. Hides the death screen and activates the main UI.
    onButtonClicked() {
        // Hide the death screen
        this.deathScreen.active = false;
        
        // Show the main UI
        this.userInterface.active = true;
        
        // Deactivate the start button
        this.startButton.active = false;

        // Show the player name input hub
        this.nameInputHub.active = true;

        // Enable the balloon catalog
        this.catalogOpen.active = true;
    }
}
