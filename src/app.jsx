import React from 'react';
import { StyleSheet, css } from './aphroditeExtension'
import Player from './player'
import InfoPanel from './eventsInfoPanel'
import DebugPanel from './debugPanel'
import config from './config'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: 'default',
      message: 'block',
      debugVisibility: 'none',
      bitrate: 0,
      stream: 'default',
      meta: '',
      streams: {
        default: [
          config.defaultStream
        ],
        backup: [
          config.backupStream
        ]
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.showMessage = this.showMessage.bind(this)
    this.pushStream = this.pushStream.bind(this)
  }
  handleChange(element,value) {
      this.setState({ [element]: value })
  }
  showMessage(mes) {
    this.setState({ message: mes === 'playing' ? 'none' : 'block' })
    const div = document.getElementById('message')
    div.innerHTML = mes
  }
  pushStream(stream) {
    const tempStreams = this.state.streams
    if(stream.title === 'default') {
      tempStreams.default = [stream, ...tempStreams.default]
      this.setState({ streams: tempStreams })
    } else {
      tempStreams.backup = [stream, ...tempStreams.backup]
      this.setState({ streams: tempStreams })
    }
  }
  render() {
  const styles = StyleSheet.create({
    messageBox: {
      display: this.state.message,
      width: "auto",
      bottom: 0,
      position: "absolute",
      right: "16px",
      color: "white",
      fontSize: "54px",
      zIndex: 100
    }
  })
    return (
      <div id="wrapper">
        <InfoPanel
        debugVisibility={this.state.debugVisibility}
        handleChange={this.handleChange}
        stream={this.stream}
        streams={this.streams}
        />
        <DebugPanel
          bitrate={this.state.bitrate}
          stream={this.state.stream}
          meta={this.state.meta}
          debugVisibility={this.state.debugVisibility}
        />
        <div id="message" className={css(styles.messageBox)} />
        <Player
        showMessage={this.showMessage}
        handleChange={this.handleChange}
        pushStream={this.pushStream}
        />
      </div>
    )
  }
}
