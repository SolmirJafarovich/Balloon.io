import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DifficultyManager')
export class DifficultyManager extends Component {
    // Initial interval between balloon spawns
    @property
    public initialSpawnInterval: number = 1;

    // Current interval between balloon spawns
    private spawnInterval: number = 1;

    // Game difficulty level
    private difficultyLevel: number = 0;

    /**
     * Constructor for the DifficultyManager class.
     * @param initialInterval - Initial interval between balloon spawns.
     */
    constructor(initialInterval: number) {
        super();
        this.spawnInterval = initialInterval;
    }

    /**
     * Increases the difficulty by reducing the interval between balloon spawns.
     * @param balloonGenerator - Balloon generator object to change the interval.
     */
    public increaseDifficulty(balloonGenerator: any) {
        this.difficultyLevel += 1;
        this.spawnInterval -= this.spawnInterval * 0.1; // Reduce the interval by 10%
        balloonGenerator.changeSpawnInterval(this.spawnInterval);
    }

    // Resets the difficulty level and the interval between balloon spawns to the initial value.
    public resetDifficulty() {
        this.difficultyLevel = 0;
        this.spawnInterval = this.initialSpawnInterval;
    }

    /**
     * Returns the current difficulty level.
     * @returns The current difficulty level.
     */
    public getDifficultyLevel() {
        return this.difficultyLevel;
    }
}
