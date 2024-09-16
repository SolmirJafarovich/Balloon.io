import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonPool')
export class BalloonPool extends Component {

    @property({
        type: [Prefab]
    })
    public balloonPrefabs: Prefab[] = []; // Префабы шариков разного типа

    @property({
        type: Number
    })
    public poolSize: number = 10; // Размер пула для каждого типа шарика

    private pools: { [key: string]: Node[] } = {}; // Словарь для пулов по типам

    start() {
        this.initPool();
    }

    // Инициализация пула объектов для каждого типа шарика
    initPool() {
        for (const prefab of this.balloonPrefabs) {
            const balloonType = prefab.name;
            this.pools[balloonType] = [];
            for (let i = 0; i < this.poolSize; i++) {
                const balloon = instantiate(prefab);
                balloon.active = false; // Деактивируем объект
                this.node.addChild(balloon); // Добавляем шарик в сцену
                this.pools[balloonType].push(balloon); // Сохраняем его в пуле
            }
        }
    }

    // Получить объект из пула по типу шарика
    getBalloon(balloonType: string): Node | null {
        const pool = this.pools[balloonType];
        if (pool && pool.length > 0) {
            const balloon = pool.pop(); // Берем объект из пула
            balloon.active = true; // Активируем объект
            return balloon;
        }
        
        // Если нет свободных шариков, создаем новый
        const prefab = this.balloonPrefabs.find(p => p.name === balloonType);
        if (prefab) {
            return instantiate(prefab);
        }

        return null;
    }

    // Возвращение объекта в пул
    returnBalloon(balloon: Node) {
        const balloonType = balloon.name;
        const poolList = this.pools[balloonType]; // Исправлен доступ к объекту
        if (poolList) {
            balloon.active = false; // Деактивируем шарик
            poolList.push(balloon);
            balloon.removeFromParent(); // Убираем из родителя
        }
    }
}
