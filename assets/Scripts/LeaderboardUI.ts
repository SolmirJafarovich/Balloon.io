import { _decorator, Component, instantiate, Node, Prefab, Label } from 'cc';
const { ccclass, property } = _decorator;

import { LeaderboardService } from './LeaderboardService';

@ccclass('LeaderboardUI')
export class LeaderboardUI extends Component {

    @property({
        type: Prefab
    })
    playerRowPrefab: Prefab = null;

    @property({
        type: Node
    })
    leaderboardContainer: Node = null;

    private leaderboardService: LeaderboardService;

    constructor(leaderboardService: LeaderboardService) {
        super();
        this.leaderboardService = leaderboardService;
    }

    public init(service: LeaderboardService): void {
        this.leaderboardService = service;
        this.updateLeaderboard(); // Обновляем таблицу лидеров при инициализации
    }

    updateLeaderboard(): void {
        this.leaderboardContainer.removeAllChildren();
        const scores = this.leaderboardService.getScores();
        
        scores.forEach((playerData, i) => {
            const newPlayerRow = instantiate(this.playerRowPrefab);
            this.leaderboardContainer.addChild(newPlayerRow);

            let playerRank = newPlayerRow.getChildByName('RankContainer').getChildByName('PlayerRank').getComponent(Label);
            playerRank.string = (i + 1).toString();
            newPlayerRow.getChildByName('NameContainer').getChildByName('PlayerName').getComponent(Label).string = playerData.name;
            newPlayerRow.getChildByName('ScoreContainer').getChildByName('PlayerScore').getComponent(Label).string = playerData.score.toString();
        });
    }

}


