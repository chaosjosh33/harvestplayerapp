let config = {
    apiKey: "AIzaSyBXB3Dm-forFXVXPzzZTH_tZTZEuTIJHyU",
    authDomain: "harvest-org.firebaseapp.com",
    projectId: "harvest-org",
    databaseURL: "https://harvest-org.firebaseio.com",
    storageBucket: "harvest-org.appspot.com",
}

firebase.initializeApp(config)

let streamUrlLoc = firebase.database().ref('/ harvest_player_app / streamUrl')

firebase.database().ref('/harvest_player_app/streamUrl/default')
    .once('value')
    .then( (snapshot) => jwplayer().load(
        [{
            'file': snapshot.val() || defaultStream
        }]
))

streamUrlLoc.on('child_added', (data) => jwplayer().load(
    [{
        'file': data.val() || defaultStream
    }]
))