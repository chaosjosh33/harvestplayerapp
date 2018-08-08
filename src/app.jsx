import React from 'react';
import { remote } from 'electron'
import { StyleSheet, css } from './aphroditeExtension'
import InfoPanel from './eventsInfoPanel'
import DebugPanel from './debugPanel'
import config from './config'
import VideoPlayer from './videojs';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: 'default',
      message: 'block',
      droppedFrames: 0,
      player: false,
      totalFrames: 0,
      debugVisibility: 'none',
      display: remote.screen.getAllDisplays()
        .find(display => display.bounds.x !== 0 || display.bounds.y !== 0)
        || remote.screen.getAllDisplays()[0],
      stream: 'default',
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
    let panel;
    if(this.state.player) {
       panel =
        (<InfoPanel
          debugVisibility={this.state.debugVisibility}
          handleChange={this.handleChange}
          stream={this.state.stream}
          player={this.state.player}
          streams={this.state.streams}
        />)
    }
    return (
      <div id="wrapper">
        {panel}
        <DebugPanel
          droppedFrames={this.state.droppedFrames}
          stream={this.state.stream}
          totalFrames={this.state.totalFrames}
          debugVisibility={this.state.debugVisibility}
        />
        <div id="message" className={css(styles.messageBox)} />
        <VideoPlayer
          display={this.state.display}
          showMessage={this.showMessage}
          handleChange={this.handleChange}
          pushStream={this.pushStream}
          stream={this.state.stream}
        />
      </div>
    )
  }
}

