import { fromEvent } from 'rxjs'
import { remote } from 'electron'
import _ from 'lodash'
import React from 'react'
import { StyleSheet, css } from './aphroditeExtension'

const screen = remote.screen
const win = remote.BrowserWindow.getAllWindows()
const displays = screen.getAllDisplays()

export default class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dialogVisibility: 'block' }
    }
    componentDidMount() {
        const userInput = fromEvent(document, 'keyup')

        userInput.subscribe(
            (event) => {
                if (event.keyCode === 191) this.setVisibility('dialogVisibility',this.state.dialogVisibility === 'none' ? 'block' : 'none')
                if (event.key === 'r') jwplayer().setPosition(0)
                if (event.key === 'c') jwplayer().setControls(!jwplayer().getControls())
                if (event.key === 'm') this.props.change('cursor', this.props.cursor === 'none!important' ? 'default!important' : 'none!important')
                if (event.key === 'l') console.log('live')
                if (event.key === 's') console.log('start')
                if (event.key === 'd') console.log('debug stats')
                if (event.key === 'a') console.log('autobitrate')
                if (event.key === 'b') console.log('backup stream')
                if (_.range(49, 57, 1).includes(event.keyCode)) {
                    if (event.shiftKey === true) {
                        console.log('lock bitrate at ' + event.code)
                    } else if (displays[Number(event.key) - 1]) {
                        try {
                            win[0].setContentBounds(
                                displays[Number(event.key) - 1].bounds
                            )
                        } catch (err) {
                            console.error('monitor ' + event.key + ' doesn\'t exist. ' + err)
                        }
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
                        <li>Shift + 1-3: Lock to specific bitrate (not recommended).</li>
                        <li>A: Automatic bitrate selection (defualt, recommended)</li>
                        <li>B: Switch between primary and backup feed</li>
                    </ul>
                </div>
        )
    }
}
