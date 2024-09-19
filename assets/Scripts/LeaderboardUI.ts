import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { LeaderboardService } from './LeaderboardService';

@ccclass('LeaderboardUI')
export class LeaderboardUI extends Component {

    // Prefab for a player row
    @property({
        type: Prefab
    })
    playerRowPrefab: Prefab = null;

    // Container node for displaying leaderboard rows
    @property({
        type: Node
    })
    leaderboardContainer: Node = null;

    // Service for interacting with the leaderboard (managing data)
    private leaderboardService: LeaderboardService;

    // Constructor for initializing the leaderboard service
    constructor(leaderboardService: LeaderboardService) {
        super();
        this.leaderboardService = leaderboardService;
    }

    // Initializes the leaderboard UI.
    public init(service: LeaderboardService): void {
        this.leaderboardService = service;
        this.updateLeaderboard(); // Update the leaderboard when initializing
    }

    /**
     * Updates the leaderboard.
     * Removes old data and creates new rows for each player.
     */
    updateLeaderboard(): void {
        // Remove all previous leaderboard rows
        this.leaderboardContainer.removeAllChildren();

        // Get current leaderboard data from the service
        const scores = this.leaderboardService.getScores();
        
        // Create a new row for each player and populate it with data
        scores.forEach((playerData, i) => {
            // Instantiate a new player row from the prefab
            const newPlayerRow = instantiate(this.playerRowPrefab);
            this.leaderboardContainer.addChild(newPlayerRow);

            // Fill in player rank, name, and score
            let playerRank = newPlayerRow.getChildByName('RankContainer')
                                         .getChildByName('PlayerRank')
                                         .getComponent(Label);
            playerRank.string = (i + 1).toString(); // Player rank (starting from 1)

            newPlayerRow.getChildByName('NameContainer')
                        .getChildByName('PlayerName')
                        .getComponent(Label).string = playerData.name; // Player name

            newPlayerRow.getChildByName('ScoreContainer')
                        .getChildByName('PlayerScore')
                        .getComponent(Label).string = playerData.score.toString(); // Player score
        });
    }
}
