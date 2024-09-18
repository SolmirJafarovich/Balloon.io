import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DifficultyManager')
export class DifficultyManager extends Component {
    // Начальный интервал между созданием воздушных шаров
    @property
    public initialSpawnInterval: number = 1;

    // Текущий интервал между созданием воздушных шаров
    private spawnInterval: number = 1;

    // Уровень сложности игры
    private difficultyLevel: number = 0;

    /**
     * Конструктор класса DifficultyManager.
     * @param initialInterval - Начальный интервал между созданием воздушных шаров.
     */
    constructor(initialInterval: number) {
        super();
        this.spawnInterval = initialInterval;
    }

    /**
     * Увеличивает уровень сложности, уменьшая интервал между созданием воздушных шаров.
     * @param balloonGenerator - Объект генератора воздушных шаров, для изменения интервала.
     */
    public increaseDifficulty(balloonGenerator: any) {
        this.difficultyLevel += 1; 
        this.spawnInterval -= this.spawnInterval * 0.1; // Уменьшение интервала на 10%
        balloonGenerator.changeSpawnInterval(this.spawnInterval); 
    }

    // Сбрасывает уровень сложности и интервал между созданием воздушных шаров к начальному значению.
    public resetDifficulty() {
        this.difficultyLevel = 0;
        this.spawnInterval = this.initialSpawnInterval; 
    }

    /**
     * Возвращает текущий уровень сложности.
     * @returns Текущий уровень сложности.
     */
    public getDifficultyLevel() {
        return this.difficultyLevel;
    }
}
