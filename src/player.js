
jwplayer('app').setup({
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
        loadscreen: "https:\/\/www.harvest.org\/images\/chromecast-splash-720.jpg",
        railcolor: "#F58025"
    },
    playlist: [{
        sources: [{
            file: "https://harvestvod-f.akamaihd.net/i/services/2018/201806281900-,1080,0720,0480,0360,0240,.mp4.csmil/master.m3u8"
        }]
    }]
})

jwplayer().setFullscreen(true)