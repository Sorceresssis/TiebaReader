
import BenzAMRRecorder from 'benz-amr-recorder';


/**
 * NOTE BenZAMRRecorder 注意事项
 * 
 * 1. pause 事件不会触发 onAutoEnded, onEnded
 */

/**
 * 控制音频和视频只能播放一个
 */
class MediaPlayServices {
    private static playingVideo: HTMLVideoElement | undefined
    private static playingAudio: HTMLAudioElement | undefined
    private static playingAmr: BenzAMRRecorder | undefined

    private static __stopOtherMedia() {
        this.playingVideo?.pause()
        this.playingVideo = void 0

        this.playingAudio?.pause()
        this.playingAudio = void 0

        this.pauseAmr()
    }

    public static playVideo(el: HTMLVideoElement): void {
        this.__stopOtherMedia()
        this.playingVideo = el
    }

    public static playAudio(el: HTMLAudioElement): void {
        this.__stopOtherMedia()
        this.playingAudio = el
    }

    public static playAmr(src: string,
        playCallback?: () => void,
        pauseCallback?: () => void,
        endCallback?: () => void,
    ): void {
        this.__stopOtherMedia()

        const amr = new BenzAMRRecorder();
        this.playingAmr = amr

        amr.initWithUrl(src).then(() => {
            if (playCallback) amr.onPlay(playCallback)
            amr.onPause(() => {
                this.playingAmr = void 0
                if (pauseCallback) pauseCallback()
            })
            amr.onEnded(() => {
                this.playingAmr = void 0
                if (endCallback) endCallback()
            })
            amr.play();
        });
    }

    public static pauseAmr(): void {
        this.playingAmr?.pause()
    }
}


export default MediaPlayServices