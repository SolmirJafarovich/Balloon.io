import { _decorator, AudioSource, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalloonAudioHandler')
export class BalloonAudioHandler extends Component {

    // Property to store the AudioSource component
    @property(AudioSource)
    public audioSource: AudioSource = null;

    // Method to play the sound
    play() {
        if (this.audioSource) {
            this.audioSource.play();
        } else {
            console.error("AudioSource component not found.");
        }
    }

    // Method to stop the sound playback
    stop() {
        if (this.audioSource) {
            this.audioSource.stop();
        }
    }
}
