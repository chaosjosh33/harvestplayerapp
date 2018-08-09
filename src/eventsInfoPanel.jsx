import { fromEvent, BehaviorSubject } from 'rxjs'
import { remote } from 'electron'
import videojs from 'video.js'
import _ from 'lodash'
import React from 'react'
import { StyleSheet, css } from './aphroditeExtension'
import { GA } from './config'

const screen = remote.screen
const win = remote.BrowserWindow.getAllWindows()
const displays = screen.getAllDisplays()

export default class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dialogVisibility: 'block' }
    }
    componentDidMount() {
        const userInput = fromEvent(document, 'keydown')
        const player = () => videojs.players[Object.keys(videojs.players)[0]]
        const debug = new BehaviorSubject(this.props.debugVisibility)

        debug.subscribe((v) => {
            if(player()) player().textTracks()[0].mode = v === "block" ? "showing" : "hidden"
        })
        const frames = new BehaviorSubject(player().getVideoPlaybackQuality())
        frames.subscribe((value) => {
            this.props.handleChange('droppedFrames', value.droppedVideoFrames)
            this.props.handleChange('totalFrames', value.totalVideoFrames)
        })
        player().on('timeupdate', () => {
            debug.next(this.props.debugVisibility)
            frames.next(player().getVideoPlaybackQuality())
        })
        userInput.subscribe(
            (event) => {
                if (event.keyCode === 191) this.setVisibility('dialogVisibility', this.state.dialogVisibility === 'none' ? 'block' : 'none')
                if (event.code === 'Space') {
                    const playing = !player().paused()
                    GA.event('videoJs', playing ? 'paused' : 'resumed', { evLabel: 'churchApp' })
                        .then(response => console.log(response))
                    playing ? player().pause() : player().play()
                }
                if (event.key === 'r') player().src([player().src()])
                if (event.key === 'c') player().controls() ? player().controls(false) : player().controls(true)
                if (event.key === 'm') {
                    document.body.style.cursor !== 'none' ? document.body.style.cursor = 'none' : document.body.style.cursor = 'default'
                }
                if (event.key === 'l') {
                    player().currentTime(-player().duration())
                    console.log(player().currentTime(-player().duration()))
                }
                if (event.key === 's') player().currentTime(0)
                if (event.key === 'd') {
                    this.props.handleChange('debugVisibility', this.props.debugVisibility === 'none' ? 'block' : 'none')
                }
                if (event.key === 'b') {
                    this.props.handleChange('stream', this.props.stream !== 'default' ? 'default' : 'backup')
                    player().src([this.props.streams[this.props.stream][0]])
                    debug.next(this.props.debugVisibility)
                }
                if (_.range(49, 57, 1).includes(event.keyCode)) {
                    const display = displays[Number(event.key) - 1]
                    try {
                        win[0].setContentBounds(
                            display.bounds
                        )
                        this.props.handleChange('display', display)
                        player().dimensions(display.bounds.width,display.bounds.height)
                    } catch (err) {
                        console.error('monitor ' + event.key + ' doesn\'t exist. ' + err)
                    }
                }
            }
        )
    }
    setVisibility(element, visibility) {
        this.setState({ [element]: visibility })
    }
    render() {
        const styles = StyleSheet.create({
            dialogWrapper: {
                position: 'absolute',
                left: '50%',
                top: '50%',
                margin: '-25% 0 0 -300px',
                padding: '32px 48px 48px 48px',
                display: this.state.dialogVisibility,
                width: '500px',
                height: '600px',
                borderRadius: '12px',
                zIndex: '100',
                backgroundColor: 'rgba(255,255,255,.6)'
            },
            appDescription: {
                lineHeight: '18px'
            },
            shortcuts: {
                lineHeight: '32px'
            }
        })
        return(
            <div className={css(styles.dialogWrapper)}>
                <h1 className={css(styles.title)}>Harvest Video Player</h1>
                <p className={css(styles.appDescription)}>
                This application is designed for full-screen playback.
                    To control the application use the keyboard shortcuts below:</p>
                <ul className={css(styles.shortcuts)}>
                    <li>?: Toggle shortcut help menu</li>
                    <li>Esc: Close the video player application</li>
                    <li>R: Restart the player</li>
                    <li>1-9: Move video window between available screens</li>
                    <li>C: Toggle on-screen control bar</li>
                    <li>Space: Play/pause video stream</li>
                    <li>M: Toggle mouse cursor visibility</li>
                    <li>L: Seek to current/live video</li>
                    <li>S: Seek to start of stream</li>
                    <li>D: Toggle application debugging/video statistics</li>
                    <li>B: Switch between primary and backup feed</li>
                </ul>
            </div>
        )
    }
}
