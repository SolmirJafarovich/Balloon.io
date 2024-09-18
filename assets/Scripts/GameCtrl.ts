import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

import { BalloonGenerator } from './BalloonGenerator';
import { DifficultyManager } from './DifficultyManager';
import { LeaderboardManager } from './LeaderboardManager';
import { UIManager } from './UIManager';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type:Node
    })
    public leaderboardManagerNode: Node = null;

    @property({
        type: Node
    })
    public balloonGeneratorNode: Node = null;

    @property({
        type:Label
    })
    public scoreLabel: Label = null;

    @property({
        type: UIManager
    })
    public uiManager: UIManager = null;

    public score: number = 0;

    public isGameRunning: boolean = false;

    private difficultyManager: DifficultyManager = null;
    public balloonGenerator: BalloonGenerator = null;
    public leaderboard: LeaderboardManager = null;
    

    start(){
        this.initGame();
        this.leaderboard = this.leaderboardManagerNode.getComponent(LeaderboardManager);
        this.balloonGenerator = this.balloonGeneratorNode.getComponent(BalloonGenerator);
        this.difficultyManager = new DifficultyManager(this.balloonGenerator.spawnInterval);
        this.difficultyManager.resetDifficulty();
    }

    initGame(){
        this.score = 0;
        this.updateScoreLabel();
        this.isGameRunning = false;
        this.uiManager.showStartScreen();
    }

    updateScoreLabel(){
        this.scoreLabel.string = `Очки: ${this.score}`;
    }

    addScore(x: number){
        if(this.isGameRunning){
            this.score += x;
            this.updateScoreLabel();
            if (Math.floor(this.score / 50) > this.difficultyManager.getDifficultyLevel()) {
                this.difficultyManager.increaseDifficulty(this.balloonGenerator);
            }
        }
    } 

    startGame(){
        this.uiManager.hideAllScreens();
        if (this.balloonGenerator) {
            this.balloonGenerator.restart();
        } else {
            console.error("BalloonGenerator is not initialized!");
        }
        this.isGameRunning = true;
    }

    endGame(code: number){
        if(this.isGameRunning){
            this.isGameRunning = false;
            this.difficultyManager.resetDifficulty();
            this.uiManager.showDeathScreen(code);
        }
    }

    
}


