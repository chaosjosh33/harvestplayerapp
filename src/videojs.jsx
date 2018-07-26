import React from 'react'
import 'videojs-contrib-hls'
import 'videojs-bitrate-graph'
import 'videojs-playlist'
import videojs from 'video.js'
import config from './config'

const fileType = 'application/x-mpegURL'
export default class VideoPlayer extends React.Component {
    componentDidMount() {
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            fullscreenToggle: true,
            width: this.props.display.bounds.width,
            sources: [{
                src: config.defaultStream.file,
                type: 'application/x-mpegURL'
            }]
        }
        this.player = videojs(this.videoNode, videoJsOptions, function onPlayready() {
            console.log('onPlayerReady', this)
        })
        // this.player.bitrateGraph()
        firebase.initializeApp(config.config)

        const defaultLoc = firebase.database().ref('/harvest_player_app/streamUrl')

        defaultLoc.once('value')
            .then((snapshot) => {
                const defaultStream = {
                    src: snapshot.val()[0].file || config.defaultStream.file,
                    title: snapshot.val()[0].title || config.defaultStream.title,
                    type: fileType
                }
                const backupStream = {
                    src: snapshot.val()[1].file || config.defaultStream.file,
                    title: snapshot.val()[1].title || config.defaultStream.title,
                    type: fileType
                }
                this.player.playlist([{ sources: [defaultStream] }])
                this.props.pushStream(defaultStream)
                this.props.pushStream(backupStream)
            })
        defaultLoc.on('child_added', (data) => {
            if (data.key > 1) {
                const stream = {
                    file: data.val().file,
                    title: data.val().title,
                    type: fileType
                }
                this.props.pushStream(stream)
                if (stream.title === this.props.stream) this.player.playlist([{ sources: [stream] }])
            }
        })
/*
        jwplayer().setControls(false)
        jwplayer().on('buffer', r => this.props.showMessage(r.newstate))
        jwplayer().on('play', r => this.props.showMessage(r.viewable ? 'playing' : 'error'))
        jwplayer().on('time', () => this.props.handleChange('bitrate', jwplayer().getVisualQuality().level.bitrate))
        jwplayer().on('bufferChange', o => this.props.handleChange('meta', JSON.stringify(o))) */
    }

    shouldComponentUpdate() {
        return false
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
