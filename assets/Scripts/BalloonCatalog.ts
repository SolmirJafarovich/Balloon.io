import { _decorator, Button, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonCatalog')
export class BalloonCatalog extends Component {

    @property({
        type: [Prefab]
    })
    public balloonPrefabs: Prefab[] = [];

    @property({
        type: Node
    })
    public parentNode: Node = null;

    @property({
        type: Node
    })
    public navigationButtons: Node = null;

    @property({
        type: Button
    })
    public nextButton: Button = null;

    @property({
        type: Button
    })
    public prevButton: Button = null;

    @property({
        type: Button
    })
    public exitButton: Button = null;

    public currentIdx: number = 0;

    private currentBalloon: Node = null; 

    onLoad() {

        this.nextButton.node.on(Button.EventType.CLICK, this.showNextBalloon, this);
        this.prevButton.node.on(Button.EventType.CLICK, this.showPreviousBalloon, this);
        this.exitButton.node.on(Button.EventType.CLICK, this.exitCatalog, this);

        this.showBalloon(this.currentIdx);
    }

    showBalloon(index: number) {

        if (this.currentBalloon) {
            this.currentBalloon.destroy();
        }
        if (index >= 0 && index < this.balloonPrefabs.length) {
            const balloonPrefab = this.balloonPrefabs[index];
            this.currentBalloon = instantiate(balloonPrefab);
            this.parentNode.addChild(this.currentBalloon);
        }
    }

    showNextBalloon() {

        this.currentIdx = (this.currentIdx + 1) % this.balloonPrefabs.length;
        this.showBalloon(this.currentIdx);
    }

    showPreviousBalloon() {

        this.currentIdx = (this.currentIdx - 1 + this.balloonPrefabs.length) % this.balloonPrefabs.length;
        this.showBalloon(this.currentIdx);
    }

    exitCatalog() {
        this.navigationButtons.active = false;
        this.node.active = false;  
    }

}


