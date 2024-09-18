import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LeaderboardService')
export class LeaderboardService {

    // Массив для хранения данных игроков (имя и очки)
    private scores: { name: string, score: number }[] = [];

    /**
     * Добавление нового игрока в таблицу лидеров.
     * 
     * @param name - Имя игрока
     * @param score - Очки игрока
     */
    addScore(name: string, score: number): void {
        // Добавляем нового игрока в массив с результатами
        this.scores.push({ name, score });

        // Сортируем игроков по количеству очков в порядке убывания
        this.scores.sort((a, b) => b.score - a.score);

        // Ограничиваем список топ 10 игроками
        this.scores = this.scores.slice(0, 10);
    }

    /**
     * Возвращает список текущих лидеров (топ 10).
     * 
     * @returns - Массив объектов с именами и очками игроков
     */
    getScores(): { name: string, score: number }[] {
        return this.scores;
    }
}
