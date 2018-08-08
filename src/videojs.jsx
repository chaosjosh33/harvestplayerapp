import React from 'react'
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'videojs-contrib-quality-levels'
import config from './config'

const fileType = 'application/x-mpegURL'
export default class VideoPlayer extends React.Component {
    componentDidMount() {
        const videoJsOptions = {
            app: this,
            autoplay: true,
            controls: false,
            width: this.props.display.bounds.width,
            sources: [{
                src: config.defaultStream.file,
                type: fileType
            }]
        }
        this.player = videojs(this.videoNode, videoJsOptions, function onPlayready() {
            console.log('onPlayerReady', this)
            videoJsOptions.app.props.handleChange('player',true)
        })

        videojs.log.level('all')
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
                this.player.src([defaultStream])
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
                if (stream.title === this.props.stream) this.player.src([stream])
            }
        })
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
