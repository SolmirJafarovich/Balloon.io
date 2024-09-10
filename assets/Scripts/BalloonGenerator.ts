import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonGenerator')
export class BalloonGenerator extends Component {


    @property({
        type:[Prefab]
    })
    public balloonPrefabs: Prefab[] = [];

    @property({
        type: Node
    })
    public ParentNode: Node = null;

    @property({
        type: Number
    })
    public spawnInterval: number = 0.7;

    start(){

        this.schedule(this.spawnBalloon, this.spawnInterval);
    }

    spawnBalloon(){
        const randomIdx = Math.floor(Math.random() * this.balloonPrefabs.length);
        const randomPrefab = this.balloonPrefabs[randomIdx];

        const spawnPosition = new Vec3(0, 0, 0);

        const newBalloon = instantiate(randomPrefab);
        
        newBalloon.setPosition(spawnPosition);

        this.ParentNode.addChild(newBalloon);
    }

    restart(){
        this.unschedule(this.spawnBalloon);  
        this.ParentNode.removeAllChildren(); 
        this.schedule(this.spawnBalloon, this.spawnInterval);
    }

    changeSpawnInterval(newInterval){
        this.unschedule(this.spawnBalloon);
        this.schedule(this.spawnBalloon, newInterval);
    }

}


