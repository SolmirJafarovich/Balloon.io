import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonGenerator')
export class BalloonGenerator extends Component {

    // List of balloon prefabs to be created
    @property({
        type: [Prefab]
    })
    public balloonPrefabs: Prefab[] = [];

    // Node where the balloons will be added
    @property({
        type: Node
    })
    public ParentNode: Node = null;

    // Interval between creating balloons
    @property({
        type: Number
    })
    public spawnInterval: number = 0.7;

    /**
     * Method called when the component starts.
     * Starts balloon creation at the specified interval.
     */
    start() {
        this.schedule(this.spawnBalloon, this.spawnInterval);
    }

    /**
     * Method to create a new balloon.
     * Selects a random prefab, creates it, and adds it to the scene.
     */
    spawnBalloon() {
        const randomIdx = Math.floor(Math.random() * this.balloonPrefabs.length);
        const randomPrefab = this.balloonPrefabs[randomIdx];

        const newBalloon = instantiate(randomPrefab);
        
        newBalloon.setPosition(new Vec3(0, 0, 0));

        this.ParentNode.addChild(newBalloon);
    }

    /**
     * Method to restart balloon generation.
     * Stops current generation, clears the parent node, and restarts with the initial interval.
     */
    restart() {
        this.unschedule(this.spawnBalloon); 
        this.ParentNode.removeAllChildren(); 
        this.schedule(this.spawnBalloon, this.spawnInterval); 
    }

    /**
     * Method to change the interval between balloon creation.
     * @param newInterval - New interval in seconds
     */
    changeSpawnInterval(newInterval: number) {
        this.unschedule(this.spawnBalloon); 
        this.schedule(this.spawnBalloon, newInterval); 
    }
}
