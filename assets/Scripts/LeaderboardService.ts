import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LeaderboardService')
export class LeaderboardService {
    private scores: { name: string, score: number }[] = [];


    addScore(name: string, score: number): void {
        this.scores.push({ name, score });
        this.scores.sort((a, b) => b.score - a.score);
        this.scores = this.scores.slice(0, 10);  // Топ 10 игроков
    }

    getScores(): { name: string, score: number }[] {
        return this.scores;
    }

}


