import { _decorator, Button, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';
import { LeaderboardService } from './LeaderboardService';
import { LeaderboardUI } from './LeaderboardUI';

@ccclass('LeaderboardManager')
export class LeaderboardManager extends Component {

    // Поле для ввода имени игрока
    @property({
        type: EditBox
    })
    nameInput: EditBox = null;

    // Кнопка отправки имени и очков
    @property({
        type: Button
    })
    submitButton: Button = null;

    // Узел для отображения поля ввода имени
    @property({
        type: Node
    })
    nameInputHub: Node = null;

    // Кнопка для начала новой игры
    @property({
        type: Button
    })
    playButton: Button = null;

    // Основной интерфейс пользователя
    @property({
        type: Node
    })
    userInterface: Node = null;

    // Узел, содержащий компонент GameCtrl
    @property({
        type: Node
    })
    public gameCtrlNode: Node = null;

    // Ссылка на компонент LeaderboardUI для отображения таблицы лидеров
    @property(LeaderboardUI)
    leaderboardUI: LeaderboardUI = null;

    // Ссылка на GameCtrl для управления игровым процессом
    private gameCtrl: GameCtrl = null;

    // Сервис для обработки таблицы лидеров
    private leaderboardService: LeaderboardService = new LeaderboardService();

    onLoad() {
        // Получаем компонент GameCtrl из узла
        this.gameCtrl = this.gameCtrlNode.getComponent(GameCtrl);

        // Проверяем наличие всех необходимых компонентов
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

        // Инициализируем LeaderboardUI с нашим сервисом
        this.leaderboardUI.init(this.leaderboardService);

        // Назначаем обработчики событий для кнопок
        this.submitButton.node.on('click', this.onSubmitClicked, this);
        this.playButton.node.on('click', this.onPlayClicked, this);
    }

    /**
     * Инициализирует менеджер таблицы лидеров с переданным сервисом.
     * @param service - Экземпляр LeaderboardService
     */
    init(service: LeaderboardService) {
        this.leaderboardService = service;
        this.leaderboardUI.init(service);  
    }

    /**
     * Обработчик нажатия на кнопку отправки имени и очков.
     * Проверяет корректность введенного имени, добавляет результат в таблицу лидеров.
     */
    onSubmitClicked() {
        const playerName = this.nameInput.string;
        const playerScore = this.gameCtrl.score;

        if (playerName.trim() === "") {
            console.error("Player name cannot be empty!");
            return;
        }

        // Добавляем результат игрока в таблицу лидеров
        this.leaderboardService.addScore(playerName, playerScore);

        // Скрываем поле ввода имени и отображаем кнопку начала игры
        this.nameInputHub.active = false;
        this.playButton.node.active = true;

        // Обновляем таблицу лидеров
        this.leaderboardUI.updateLeaderboard();

        // Сбрасываем очки и обновляем отображение
        if (this.gameCtrl) {
            this.gameCtrl.score = 0;
            this.gameCtrl.updateScoreLabel();
        } else {
            console.error("GameCtrl not found.");
        }
    }

    /**
     * Обработчик нажатия на кнопку "Играть".
     * Запускает новую игру.
     */
    onPlayClicked() {
        if (this.gameCtrl) {
            this.gameCtrl.startGame();
        } else {
            console.error("GameCtrl not found.");
        }
    }
}
