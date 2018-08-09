import React from 'react'
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'videojs-contrib-quality-levels'
import { DefaultStream, BackupStream, GA, Firebase } from './config'

const fileType = 'application/x-mpegURL'
export default class VideoPlayer extends React.Component {
    componentDidMount() {
        const videoJsOptions = {
            app: this,
            autoplay: true,
            controls: false,
            width: this.props.display.bounds.width,
            sources: [{
                src: DefaultStream.file,
                type: fileType
            }]
        }
        this.player = videojs(this.videoNode, videoJsOptions, function onPlayready() {
            console.log('onPlayerReady', this)
            videoJsOptions.app.props.handleChange('player',true)
        })

        videojs.log.level('all')
        firebase.initializeApp(Firebase)

        const defaultLoc = firebase.database().ref('/harvest_player_app/streamUrl')

        defaultLoc.once('value')
            .then((snapshot) => {
                const defaultStream = {
                    src: snapshot.val()[0].file || DefaultStream.file,
                    title: snapshot.val()[0].title || DefaultStream.title,
                    type: fileType
                }
                const backupStream = {
                    src: snapshot.val()[1].file || BackupStream.file,
                    title: snapshot.val()[1].title || BackupStream.title,
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
        GA.event('videoJs', 'playerLoaded', { evLabel: 'churchApp' })
            .then(response => console.log(response))
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
