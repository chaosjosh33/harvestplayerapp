import React from 'react'
import ReactJWPlayer from 'react-jw-player'
import config from './config'

export default class Player extends React.Component {
    componentDidMount() {
        firebase.initializeApp(config.config)

        const defaultLoc = firebase.database().ref('/harvest_player_app/streamUrl')

        defaultLoc.once('value')
            .then((snapshot) => {
                const defaultStream = {
                    file: snapshot.val()[0].file || config.defaultStream.file,
                    title: snapshot.val()[0].title || config.defaultStream.title
                }
                const backupStream = {
                    file: snapshot.val()[1].file || config.defaultStream.file,
                    title: snapshot.val()[1].title || config.defaultStream.title
                }
                jwplayer().load([defaultStream])
                this.props.pushStream(defaultStream)
                this.props.pushStream(backupStream)
            })
        defaultLoc.on('child_added', (data) => {
            if(data.key > 1) {
                const stream = {
                    file: data.val().file,
                    title: data.val().title
                }
                this.props.pushStream(stream)
                if (stream.title === this.props.stream) jwplayer().load(stream)
            }
        })

        jwplayer().setControls(false)
        jwplayer().on('buffer', r => this.props.showMessage(r.newstate))
        jwplayer().on('play', r => this.props.showMessage(r.viewable ? 'playing' : 'error'))
        jwplayer().on('time', () => {
            this.props.handleChange('bitrate', jwplayer().getVisualQuality().level.bitrate)
        })
        jwplayer().on('bufferChange', (o) => {
            this.props.handleChange('meta', JSON.stringify(o.meta))
        })
    }

    shouldComponentUpdate() {
        return false
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
                sources: [config.defaultStream]
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
