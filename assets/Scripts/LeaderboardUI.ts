import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { LeaderboardService } from './LeaderboardService';

@ccclass('LeaderboardUI')
export class LeaderboardUI extends Component {

    // Префаб для строки с данными игрока
    @property({
        type: Prefab
    })
    playerRowPrefab: Prefab = null;

    // Узел-контейнер для отображения строк таблицы лидеров
    @property({
        type: Node
    })
    leaderboardContainer: Node = null;

    // Сервис для взаимодействия с таблицей лидеров (управление данными)
    private leaderboardService: LeaderboardService;

    // Конструктор для инициализации сервиса таблицы лидеров
    constructor(leaderboardService: LeaderboardService) {
        super();
        this.leaderboardService = leaderboardService;
    }

    // Инициализация UI таблицы лидеров.
    public init(service: LeaderboardService): void {
        this.leaderboardService = service;
        this.updateLeaderboard(); // Обновляем таблицу лидеров при инициализации
    }

    /**
     * Обновление таблицы лидеров.
     * Удаляет старые данные и создает новые строки для каждого игрока.
     */
    updateLeaderboard(): void {
        // Удаляем все предыдущие строки лидеров
        this.leaderboardContainer.removeAllChildren();

        // Получаем текущие данные лидеров из сервиса
        const scores = this.leaderboardService.getScores();
        
        // Для каждого игрока создаем новую строку и заполняем её данными
        scores.forEach((playerData, i) => {
            // Создаем новый узел для строки игрока
            const newPlayerRow = instantiate(this.playerRowPrefab);
            this.leaderboardContainer.addChild(newPlayerRow);

            // Заполняем данные о ранге, имени и очках игрока
            let playerRank = newPlayerRow.getChildByName('RankContainer')
                                         .getChildByName('PlayerRank')
                                         .getComponent(Label);
            playerRank.string = (i + 1).toString(); // Ранг игрока (начиная с 1)

            newPlayerRow.getChildByName('NameContainer')
                        .getChildByName('PlayerName')
                        .getComponent(Label).string = playerData.name; // Имя игрока

            newPlayerRow.getChildByName('ScoreContainer')
                        .getChildByName('PlayerScore')
                        .getComponent(Label).string = playerData.score.toString(); // Очки игрока
        });
    }
}
