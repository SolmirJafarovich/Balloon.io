import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonGenerator')
export class BalloonGenerator extends Component {

    // Список префабов воздушных шаров, которые можно создать
    @property({
        type: [Prefab]
    })
    public balloonPrefabs: Prefab[] = [];

    // Узел, в который будут добавляться созданные шары
    @property({
        type: Node
    })
    public ParentNode: Node = null;

    // Интервал между созданием воздушных шаров
    @property({
        type: Number
    })
    public spawnInterval: number = 0.7;

    /**
     * Метод, вызываемый при старте компонента.
     * Запускает создание воздушных шаров с заданным интервалом.
     */
    start() {
        this.schedule(this.spawnBalloon, this.spawnInterval);
    }

    /**
     * Метод для создания нового воздушного шара.
     * Выбирает случайный префаб, создаёт его и добавляет на сцену.
     */
    spawnBalloon() {
        // Выбор случайного префаба из списка
        const randomIdx = Math.floor(Math.random() * this.balloonPrefabs.length);
        const randomPrefab = this.balloonPrefabs[randomIdx];

        // Создание новой копии префаба
        const newBalloon = instantiate(randomPrefab);
        
        newBalloon.setPosition(new Vec3(0, 0, 0));

        // Добавление шара в родительский узел
        this.ParentNode.addChild(newBalloon);
    }

    /**
     * Метод для перезапуска генерации воздушных шаров.
     * Останавливает текущее создание, очищает родительский узел и перезапускает создание с начальным интервалом.
     */
    restart() {
        this.unschedule(this.spawnBalloon);  // Останавливаем текущее создание
        this.ParentNode.removeAllChildren(); // Очищаем родительский узел от старых шаров
        this.schedule(this.spawnBalloon, this.spawnInterval); // Запускаем создание с начальным интервалом
    }

    /**
     * Метод для изменения интервала между созданием воздушных шаров.
     * @param newInterval - Новый интервал в секундах
     */
    changeSpawnInterval(newInterval: number) {
        this.unschedule(this.spawnBalloon); // Останавливаем текущее создание
        this.schedule(this.spawnBalloon, newInterval); // Запускаем создание с новым интервалом
    }
}
