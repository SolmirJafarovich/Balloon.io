import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

import { BalloonGenerator } from './BalloonGenerator';
import { DifficultyManager } from './DifficultyManager';
import { LeaderboardManager } from './LeaderboardManager';
import { UIManager } from './UIManager';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    // Узел, содержащий компонент менеджера таблицы лидеров
    @property({
        type:Node
    })
    public leaderboardManagerNode: Node = null;

    // Узел, содержащий компонент генератора шаров
    @property({
        type: Node
    })
    public balloonGeneratorNode: Node = null;

    // Отображение очков игрока
    @property({
        type:Label
    })
    public scoreLabel: Label = null;

    // Менеджер UI, отвечающий за управление экранами интерфейса
    @property({
        type: UIManager
    })
    public uiManager: UIManager = null;

    // Текущий счет игрока
    public score: number = 0;

    // Флаг, указывающий, идет ли игра
    public isGameRunning: boolean = false;

    // Менеджер сложности игры
    private difficultyManager: DifficultyManager = null;

    // Генератор шаров
    public balloonGenerator: BalloonGenerator = null;

    // Менеджер таблицы лидеров
    public leaderboard: LeaderboardManager = null;
    
    // Инициализация игры при запуске
    start() {
        this.initGame();
        this.leaderboard = this.leaderboardManagerNode.getComponent(LeaderboardManager);
        this.balloonGenerator = this.balloonGeneratorNode.getComponent(BalloonGenerator);
        this.difficultyManager = new DifficultyManager(this.balloonGenerator.spawnInterval);
        this.difficultyManager.resetDifficulty();
    }

    // Начальная настройка игры
    initGame() {
        this.score = 0;
        this.updateScoreLabel();
        this.isGameRunning = false;
        this.uiManager.showStartScreen();
    }

    // Обновление метки счета на экране
    updateScoreLabel() {
        this.scoreLabel.string = `Очки: ${this.score}`;
    }

    // Добавление очков и увеличение сложности, если нужно
    addScore(x: number) {
        if(this.isGameRunning){
            this.score += x;
            this.updateScoreLabel();
            // Увеличение сложности игры каждые 50 очков
            if (Math.floor(this.score / 50) > this.difficultyManager.getDifficultyLevel()) {
                this.difficultyManager.increaseDifficulty(this.balloonGenerator);
            }
        }
    } 

    // Начало игры, скрытие экранов и перезапуск генерации шаров
    startGame() {
        this.uiManager.hideAllScreens();
        if (this.balloonGenerator) {
            this.balloonGenerator.restart();
        } else {
            console.error("BalloonGenerator is not initialized!");
        }
        this.isGameRunning = true;
    }

    // Завершение игры, сброс сложности и отображение экрана смерти
    endGame(code: number) {
        if(this.isGameRunning){
            this.isGameRunning = false;
            this.difficultyManager.resetDifficulty();
            this.uiManager.showDeathScreen(code);
        }
    }
}
