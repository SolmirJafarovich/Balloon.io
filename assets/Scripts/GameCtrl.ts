import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

import { BalloonGenerator } from './BalloonGenerator';
import { DifficultyManager } from './DifficultyManager';
import { LeaderboardManager } from './LeaderboardManager';
import { UIManager } from './UIManager';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    // Node containing the LeaderboardManager component
    @property({
        type: Node
    })
    public leaderboardManagerNode: Node = null;

    // Node containing the BalloonGenerator component
    @property({
        type: Node
    })
    public balloonGeneratorNode: Node = null;

    // Label for displaying the player's score
    @property({
        type: Label
    })
    public scoreLabel: Label = null;

    // UIManager responsible for managing UI screens
    @property({
        type: UIManager
    })
    public uiManager: UIManager = null;

    // Current player's score
    public score: number = 0;

    // Flag indicating if the game is running
    public isGameRunning: boolean = false;

    // Game difficulty manager
    private difficultyManager: DifficultyManager = null;

    // Balloon generator
    public balloonGenerator: BalloonGenerator = null;

    // Leaderboard manager
    public leaderboard: LeaderboardManager = null;

    // Initialize the game when the component starts
    start() {
        this.initGame();
        this.leaderboard = this.leaderboardManagerNode.getComponent(LeaderboardManager);
        this.balloonGenerator = this.balloonGeneratorNode.getComponent(BalloonGenerator);
        this.difficultyManager = new DifficultyManager(this.balloonGenerator.spawnInterval);
        this.difficultyManager.resetDifficulty();
    }

    // Initial game setup
    initGame() {
        this.score = 0;
        this.updateScoreLabel();
        this.isGameRunning = false;
        this.uiManager.showStartScreen();
    }

    // Update the score label on the screen
    updateScoreLabel() {
        this.scoreLabel.string = `Очки: ${this.score}`;
    }

    // Add score and increase difficulty if needed
    addScore(x: number) {
        if (this.isGameRunning) {
            this.score += x;
            this.updateScoreLabel();
            // Increase difficulty every 50 points
            if (Math.floor(this.score / 50) > this.difficultyManager.getDifficultyLevel()) {
                this.difficultyManager.increaseDifficulty(this.balloonGenerator);
            }
        }
    } 

    // Start the game, hide screens, and restart balloon generation
    startGame() {
        this.uiManager.hideAllScreens();
        if (this.balloonGenerator) {
            this.balloonGenerator.restart();
        } else {
            console.error("BalloonGenerator is not initialized!");
        }
        this.isGameRunning = true;
    }

    // End the game, reset difficulty, and show the death screen
    endGame(code: number) {
        if (this.isGameRunning) {
            this.isGameRunning = false;
            this.difficultyManager.resetDifficulty();
            this.uiManager.showDeathScreen(code);
        }
    }
}
