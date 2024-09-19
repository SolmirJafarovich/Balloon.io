import { _decorator, Button, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonCatalog')
export class BalloonCatalog extends Component {

    // List of balloon prefabs to be displayed in the catalog
    @property({
        type: [Prefab]
    })
    public balloonPrefabs: Prefab[] = [];

    // Parent node where balloons will be added
    @property({
        type: Node
    })
    public parentNode: Node = null;

    // Node with navigation buttons
    @property({
        type: Node
    })
    public navigationButtons: Node = null;

    // Button to go to the next balloon
    @property({
        type: Button
    })
    public nextButton: Button = null;

    // Button to go to the previous balloon
    @property({
        type: Button
    })
    public prevButton: Button = null;

    // Button to exit the catalog
    @property({
        type: Button
    })
    public exitButton: Button = null;

    // Index of the currently displayed balloon
    public currentIdx: number = 0;

    // Currently displayed balloon 
    private currentBalloon: Node = null; 

    // Method called when the component is initialized
    onLoad() {
        this.nextButton.node.on(Button.EventType.CLICK, this.showNextBalloon, this);
        this.prevButton.node.on(Button.EventType.CLICK, this.showPreviousBalloon, this);
        this.exitButton.node.on(Button.EventType.CLICK, this.exitCatalog, this);

        // Show the first balloon on load
        this.showBalloon(this.currentIdx);
    }

    // Displays the balloon at the specified index
    showBalloon(index: number) {
        if (this.currentBalloon) {
            this.currentBalloon.destroy();
        }

        // Ensure the index is within the valid range
        if (index >= 0 && index < this.balloonPrefabs.length) {
            const balloonPrefab = this.balloonPrefabs[index];
            // Create a new balloon instance and add it to the parent node
            this.currentBalloon = instantiate(balloonPrefab);
            this.parentNode.addChild(this.currentBalloon);
        }
    }

    // Shows the next balloon
    showNextBalloon() {
        // Increment the index and display the balloon with this index
        this.currentIdx = (this.currentIdx + 1) % this.balloonPrefabs.length;
        this.showBalloon(this.currentIdx);
    }

    // Shows the previous balloon
    showPreviousBalloon() {
        // Decrement the index, considering the number of prefabs, and display the balloon
        this.currentIdx = (this.currentIdx - 1 + this.balloonPrefabs.length) % this.balloonPrefabs.length;
        this.showBalloon(this.currentIdx);
    }

    // Exits the catalog (hides the interface)
    exitCatalog() {
        this.navigationButtons.active = false;
        this.node.active = false;  
    }
}
