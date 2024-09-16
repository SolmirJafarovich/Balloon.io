import { _decorator, Component, Node, Vec3, view } from 'cc';
import { BalloonPool } from './BalloonPool';
const { ccclass, property } = _decorator;

@ccclass('BalloonGenerator')
export class BalloonGenerator extends Component {


    @property({
        type: BalloonPool
    })
    public balloonPool: BalloonPool = null; // Пул объектов

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

    // Метод для генерации случайной позиции шарика
    private getRandomPosition(): Vec3 {
        const randomX = this.randomRange(-view.getVisibleSize().width / 2.2, view.getVisibleSize().width / 2.2);
        const startY = -view.getVisibleSize().height / 2;
        return new Vec3(randomX, startY, 0); // Случайная позиция по X и начальная позиция по Y
    }

    spawnBalloon() {
        const randomIdx = Math.floor(Math.random() * this.balloonPool.balloonPrefabs.length);
        const balloonPrefab = this.balloonPool.balloonPrefabs[randomIdx];
        const balloonType = balloonPrefab.name;

        const newBalloon = this.balloonPool.getBalloon(balloonType); // Берем объект из пула
        if (newBalloon) {
            const randomPosition = this.getRandomPosition(); // Генерируем случайную позицию
            newBalloon.setPosition(randomPosition); // Устанавливаем позицию для нового шарика
            this.ParentNode.addChild(newBalloon); // Добавляем шарик в сцену
        }
    }

    // Когда шарик пропадает или лопается, возвращаем его в пул
    returnBalloonToPool(balloon: Node) {
        this.balloonPool.returnBalloon(balloon);
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

    // Генерация случайного числа в заданном диапазоне
    randomRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

}


