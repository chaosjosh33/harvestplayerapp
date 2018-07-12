import { fromEvent } from 'rxjs'
import React from 'react'

const _ = require('lodash')

const app = require('electron').remote.app

export default class InfoPanel extends React.Component {
    componentDidMount() {
        const input = fromEvent(document, 'keyup')

        input.subscribe(
            (event) => {
                if (event.keyCode === 27) app.quit()
                if (event.key === '?') console.log('help dialog')
                if (event.key === 'r') console.log('restart')
                if (event.key === 'c') console.log('controls')
                if (event.key === 'm') console.log('show/hide mouse')
                if (event.key === 'l') console.log('live')
                if (event.key === 's') console.log('start')
                if (event.key === 'd') console.log('debug stats')
                if (event.key === 'a') console.log('autobitrate')
                if (event.key === 'b') console.log('backup stream')
                if (_.range(49, 57, 1).includes(event.keyCode)) {
                    if (event.shiftKey === true) {
                        console.log('lock bitrate at ' + event.code)
                    } else {
                        console.log('move screen to monitor ' + event.code)
                    }
                }
            }
        )
    }
    render() {
        return(
                <p>This is input</p>
        )
    }
}
