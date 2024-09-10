import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

import { BalloonGenerator } from './BalloonGenerator';
import { LeaderboardManager } from './LeaderboardManager';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type:Node
    })
    public userInterface: Node = null;

    @property({
        type:Node
    })
    public leaderboardManagerNode: Node = null;
    public leaderboard: LeaderboardManager = null;

    @property({
        type: Node
    })
    public balloonGeneratorNode: Node = null;
    public balloonGenerator: BalloonGenerator = null;

    @property({
        type:Node
    })
    public startButton: Node = null;

    @property({
        type:Node
    })
    public nameInputHub: Node = null;

    @property({
        type:Label
    })
    public scoreLabel: Label = null;

    @property({
        type:Node
    })
    public catalogOpen: Node = null;

    @property({
        type:Node
    })
    public deathScreen: Node = null;

    @property({
        type:Node
    })
    public deathScreenBlackBalloon: Node = null;


    public score: number = 0;
    public difficultyLevel:number = 0;
    public spawnInterval: number = 1;

    public isGameRunning: boolean = false;

    start(){
        this.initGame();
        this.leaderboard = this.leaderboardManagerNode.getComponent(LeaderboardManager);
        this.balloonGenerator = this.balloonGeneratorNode.getComponent(BalloonGenerator);
        this.spawnInterval = this.balloonGenerator.spawnInterval;
    }

    initGame(){
        this.score = 0;
        this.updateScoreLabel();
        this.isGameRunning = false;
        this.userInterface.active = true;
        this.startButton.active = true;
        this.nameInputHub.active = false;
    }

    updateScoreLabel(){
        this.scoreLabel.string = `Очки: ${this.score}`;
    }

    addScore(x: number){
        if(this.isGameRunning){
            this.score += x;
            this.updateScoreLabel();
            if (Math.floor(this.score / 50) > this.difficultyLevel){
                this.increaseDifficulty();
            }
        }
    }

    increaseDifficulty(){
        this.difficultyLevel += 1;
        this.spawnInterval -= this.spawnInterval * 0.1;
        this.balloonGenerator.changeSpawnInterval(this.spawnInterval)
    }

    startGame(){
        this.userInterface.active = false;
        this.catalogOpen.active = false;
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
            this.difficultyLevel = 0;
            switch (code){
                case (0):{
                    this.deathScreen.active = true;
                    break;
                }
                case (1):{
                    this.deathScreenBlackBalloon.active = true;
                    break;
                }
            }
        }
    }

    
}


