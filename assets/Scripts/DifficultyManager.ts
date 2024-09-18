import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DifficultyManager')
export class DifficultyManager extends Component {
    @property
    public initialSpawnInterval: number = 1;

    private spawnInterval: number = 1;
    private difficultyLevel: number = 0;

    constructor(initialInterval: number) {
        super();
        this.spawnInterval = initialInterval;
    }

    public increaseDifficulty(balloonGenerator: any) {
        this.difficultyLevel += 1;
        this.spawnInterval -= this.spawnInterval * 0.1;
        balloonGenerator.changeSpawnInterval(this.spawnInterval);
    }

    public resetDifficulty() {
        this.difficultyLevel = 0;
        this.spawnInterval = this.initialSpawnInterval;
    }

    public getDifficultyLevel() {
        return this.difficultyLevel;
    }
}

