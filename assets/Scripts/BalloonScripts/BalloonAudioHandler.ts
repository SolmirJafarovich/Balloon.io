import { _decorator, AudioSource, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonAudioHandler')
export class BalloonAudioHandler extends Component {

    // Свойство для хранения компонента AudioSource
    @property(AudioSource)
    public audioSource: AudioSource = null;

    // Метод для воспроизведения звука
    play() {
        if (this.audioSource) {
            // Если компонент AudioSource присутствует, запускаем звук
            this.audioSource.play();
        } else {
            // Если компонент не найден, выводим сообщение об ошибке
            console.error("AudioSource component not found.");
        }
    }

    // Метод для остановки воспроизведения звука
    stop() {
        if (this.audioSource) {
            this.audioSource.stop();
        }
    }
}
