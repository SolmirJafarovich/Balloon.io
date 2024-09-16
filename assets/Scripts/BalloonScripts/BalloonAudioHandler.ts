import { _decorator, AudioSource, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonAudioHandler')
export class BalloonAudioHandler extends Component {

    @property(AudioSource)
    public audioSource: AudioSource = null;

    play() {
        if (this.audioSource) {
            this.audioSource.play();
        } else {
            console.error("AudioSource component not found.");
        }
    }

    stop() {
        if (this.audioSource) {
            this.audioSource.stop();
        }
    }
}

