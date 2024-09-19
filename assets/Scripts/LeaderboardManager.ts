import { _decorator, Button, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';
import { LeaderboardService } from './LeaderboardService';
import { LeaderboardUI } from './LeaderboardUI';

@ccclass('LeaderboardManager')
export class LeaderboardManager extends Component {

    // Field for entering player name
    @property({
        type: EditBox
    })
    nameInput: EditBox = null;

    // Button for submitting name and score
    @property({
        type: Button
    })
    submitButton: Button = null;

    // Node for displaying the name input field
    @property({
        type: Node
    })
    nameInputHub: Node = null;

    // Button to start a new game
    @property({
        type: Button
    })
    playButton: Button = null;

    // Main user interface
    @property({
        type: Node
    })
    userInterface: Node = null;

    // Node containing the GameCtrl component
    @property({
        type: Node
    })
    public gameCtrlNode: Node = null;

    // Reference to LeaderboardUI for displaying the leaderboard
    @property(LeaderboardUI)
    leaderboardUI: LeaderboardUI = null;

    // Reference to GameCtrl for managing the game
    private gameCtrl: GameCtrl = null;

    // Service for handling the leaderboard
    private leaderboardService: LeaderboardService = new LeaderboardService();

    onLoad() {
        // Get the GameCtrl component from the node
        this.gameCtrl = this.gameCtrlNode.getComponent(GameCtrl);

        // Check for the presence of all required components
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

        // Initialize LeaderboardUI with our service
        this.leaderboardUI.init(this.leaderboardService);

        // Assign event handlers for the buttons
        this.submitButton.node.on('click', this.onSubmitClicked, this);
        this.playButton.node.on('click', this.onPlayClicked, this);
    }

    /**
     * Initializes the leaderboard manager with the provided service.
     * @param service - An instance of LeaderboardService
     */
    init(service: LeaderboardService) {
        this.leaderboardService = service;
        this.leaderboardUI.init(service);  
    }

    /**
     * Handler for the submit button click event.
     * Checks the validity of the entered name and adds the result to the leaderboard.
     */
    onSubmitClicked() {
        const playerName = this.nameInput.string;
        const playerScore = this.gameCtrl.score;

        if (playerName.trim() === "") {
            console.error("Player name cannot be empty!");
            return;
        }

        // Add the player's result to the leaderboard
        this.leaderboardService.addScore(playerName, playerScore);

        // Hide the name input field and display the start game button
        this.nameInputHub.active = false;
        this.playButton.node.active = true;

        // Update the leaderboard
        this.leaderboardUI.updateLeaderboard();

        // Reset the score and update the display
        if (this.gameCtrl) {
            this.gameCtrl.score = 0;
            this.gameCtrl.updateScoreLabel();
        } else {
            console.error("GameCtrl not found.");
        }
    }

    /**
     * Handler for the play button click event.
     * Starts a new game.
     */
    onPlayClicked() {
        if (this.gameCtrl) {
            this.gameCtrl.startGame();
        } else {
            console.error("GameCtrl not found.");
        }
    }
}
