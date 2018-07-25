import React from 'react'
import 'videojs-contrib-hls'
import videojs from 'video.js'
import config from './config'

export default class VideoPlayer extends React.Component {
    componentDidMount() {
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            fullscreenToggle: false,
            width: this.props.display.bounds.width,
            sources: [{
                src: config.defaultStream.file,
                type: 'application/x-mpegURL'
            }]
        }
        this.player = videojs(this.videoNode, videoJsOptions, function onPlayready() {
            console.log('onPlayerReady', this)
        })
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <div data-vjs-player>
                <video ref={(node) => { this.videoNode = node }} className="video-js" />
            </div>
        )
    }
}
