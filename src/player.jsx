import React from 'react'
import ReactJWPlayer from 'react-jw-player'
import config from './config'

export default class Player extends React.Component {
    componentDidMount() {
        firebase.initializeApp(config.config)
        jwplayer().setControls(false)

        const streamUrlLoc = firebase.database().ref('/harvest_player_app/streamUrl')

        firebase.database().ref('/harvest_player_app/streamUrl/default')
            .once('value')
            .then(snapshot => jwplayer().load(
                [{
                    file: snapshot.val() || config.defaultStream
                }]
            ))

        streamUrlLoc.on('child_added', data => jwplayer().load(
            [{
                file: data.val() || config.defaultStream
            }]
        ))
    }

    render() {
        const jwconfig = {
            width: '100%',
            aspectratio: '16:9',
            bgcolor: '#000000',
            skin: 'glow',
            wmode: 'direct',
            mute: true,
            autostart: true,
            primary: 'html',
            abouttext: 'Having technical issues? Harvest can help',
            aboutlink: 'https://www.harvest.org/webcast-feedback.html?webcast_url=' + encodeURIComponent(window.location.href),
            androidhls: true,
            cast: {
                appid: "F7C2C937",
                loadscreen: "https://www.harvest.org/images/chromecast-splash-720.jpg",
                railcolor: "#F58025"
            },
            playlist: [{
                sources: [{
                    file: config.defaultStream
                }]
            }]
        }

        return(
            <ReactJWPlayer
                playerId="jwplayer"
                playerScript="https://content.jwplatform.com/libraries/U7kzhyAF.js"
                playlist={jwconfig.playlist}
                isMuted={true}
            />
        )
    }
}
