import React from 'react';
import { StyleSheet, css } from './aphroditeExtension'
import Player from './player'
import InfoPanel from './eventsInfoPanel';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { cursor: 'default' }
  }
  handleChange(element,value) {
    this.setState({ [element]: value })
  }
  render() {
    const style = StyleSheet.create({
      wrapper: {
        cursor: this.state.cursor
      }
    })
    return (
      <div id="wrapper" className={css(style.wrapper)}>
        <InfoPanel cursor={this.state.cursor} change={this.handleChange} />
        <Player />
      </div>
    )
  }
}
