import { _decorator, Button, Component, EditBox, instantiate, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('LeaderboardManager')
export class LeaderboardManager extends Component {

    @property({
        type:Prefab
    })
    playerRowPrefab: Prefab = null;

    @property({
        type: Node
    })
    leaderboardContainer: Node = null;

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
    private gameCtrl: GameCtrl = null;


    private scores: {name: string, score: number }[] = [];

    onLoad(){

        this.gameCtrl = this.gameCtrlNode.getComponent(GameCtrl);

        if (!this.gameCtrl) {
            console.error("GameCtrl is not set!");
            return;
        }

        if (!this.playerRowPrefab) {
            console.error("Player Row Prefab is not set!");
            return;
        }

        if (!this.leaderboardContainer) {
            console.error("Leaderboard Container is not set!");
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


        this.scores.push({name: "BBQ", score: 513});


        this.updateLeaderboard();

        this.submitButton.node.on('click', this.onSubmitClicked, this);

        this.playButton.node.on('click', this.onPlayClicked, this);

    }

    updateLeaderboard(){
        this.leaderboardContainer.removeAllChildren();

        this.scores.sort((a, b) => b.score - a.score);

        this.scores = this.scores.slice(0, 10);

        for (let i = 0; i < this.scores.length; i++){
            const playerData = this.scores[i];

            let newPlayerRow = instantiate(this.playerRowPrefab);
            this.leaderboardContainer.addChild(newPlayerRow);

            let playerRank = newPlayerRow.getChildByName('RankContainer').getChildByName('PlayerRank').getComponent(Label);
            playerRank.string = (i + 1).toString(); 
            newPlayerRow.getChildByName('NameContainer').getChildByName('PlayerName').getComponent(Label).string = playerData.name;
            newPlayerRow.getChildByName('ScoreContainer').getChildByName('PlayerScore').getComponent(Label).string = playerData.score.toString();

        }
    }

    addScore(name:string, score:number){
        this.scores.push({name, score});
        this.updateLeaderboard();
    }

    onSubmitClicked(){
        const playerName = this.nameInput.string;
        const playerScore = this.gameCtrl.score;

        if (playerName.trim() === "") {
            console.error("Player name cannot be empty!");
            return;
        }

        this.addScore(playerName, playerScore);
        this.nameInputHub.active = false;
        this.playButton.node.active = true;

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


