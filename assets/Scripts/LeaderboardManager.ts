import { _decorator, Button, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';
import { LeaderboardService } from './LeaderboardService';
import { LeaderboardUI } from './LeaderboardUI';

@ccclass('LeaderboardManager')
export class LeaderboardManager extends Component {

    @property({
        type:EditBox
    })
    nameInput: EditBox = null;

    @property({
        type: Button
    })
    submitButton: Button = null;

    @property({
        type: Node
    })
    nameInputHub: Node = null;

    @property({
        type:Button
    })
    playButton: Button = null;

    @property({
        type:Node
    })
    userInterface: Node = null;

    @property({
        type: Node
    })
    public gameCtrlNode: Node = null;

    @property(LeaderboardUI)
    leaderboardUI: LeaderboardUI = null;  // Ссылка на UI компонент


    private gameCtrl: GameCtrl = null;
    private leaderboardService: LeaderboardService = new LeaderboardService();
    


    onLoad(){

        this.gameCtrl = this.gameCtrlNode.getComponent(GameCtrl);

        if (!this.gameCtrl) {
            console.error("GameCtrl is not set!");
            return;
        }

        if (!this.nameInput) {
            console.error("Name Input is not set!");
            return;
        }

        if (!this.submitButton) {
            console.error("Submit Button is not set!");
            return;
        }

        this.leaderboardService.addScore("BBQ", 513);

        // Инициализация LeaderboardUI с сервисом
        this.leaderboardUI.init(this.leaderboardService);

        this.submitButton.node.on('click', this.onSubmitClicked, this);

        this.playButton.node.on('click', this.onPlayClicked, this);

    }

    init(service: LeaderboardService) {
        this.leaderboardService = service;
        this.leaderboardUI.init(service);  // Инициализация UI с сервисом
    }

    onSubmitClicked(){
        const playerName = this.nameInput.string;
        const playerScore = this.gameCtrl.score;

        if (playerName.trim() === "") {
            console.error("Player name cannot be empty!");
            return;
        }

        this.leaderboardService.addScore(playerName, playerScore);
        this.nameInputHub.active = false;
        this.playButton.node.active = true;

        this.leaderboardUI.updateLeaderboard();

        //this.nameInput.string = "";
        if (this.gameCtrl) {
            this.gameCtrl.score = 0;
            this.gameCtrl.updateScoreLabel();
        }
        else {
            console.error("GameCtrl not found.");
        }

    }

    onPlayClicked(){
        if (this.gameCtrl) {
            this.gameCtrl.startGame();
        } 
        else {
            console.error("GameCtrl not found.");
        }
    }
}


