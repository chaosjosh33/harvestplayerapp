import React from 'react';
import Player from './player'
import InfoPanel from './events';

export default class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Player />
        <InfoPanel />
      </div>
    )
  }
}
