import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LeaderboardService')
export class LeaderboardService {

    // Array to store player data (name and score)
    private scores: { name: string, score: number }[] = [];

    /**
     * Adds a new player to the leaderboard.
     * 
     * @param name - Player's name
     * @param score - Player's score
     */
    addScore(name: string, score: number): void {
        // Add the new player to the scores array
        this.scores.push({ name, score });

        // Sort players by score in descending order
        this.scores.sort((a, b) => b.score - a.score);

        // Limit the list to the top 10 players
        this.scores = this.scores.slice(0, 10);
    }

    /**
     * Returns the current leaderboard (top 10).
     * 
     * @returns - Array of objects with player names and scores
     */
    getScores(): { name: string, score: number }[] {
        return this.scores;
    }
}
