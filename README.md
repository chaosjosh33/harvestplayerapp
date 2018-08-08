# Harvest Player Electron App

This is the Harvest Player desktop app that replaces the legacy Adobe Air player app using Electron framework to build with web technologies.  

This application incorporates the following web technology: 
- NodeJS
- VideoJS
- ReactJS
- RXJS
- Firebase Realtime Database
- Aphrodite

Firebase is used to control the stream URLs in realtime, if no firebase exists then it defaults to the streams configured in `src/config.jsx`

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone git@harvestonline.git.beanstalkapp.com:/harvestonline/harvest-player-electron-app.git
# Go into the repository
cd harvest-player-electron-app
```
Create a `.env` file in project root and fill it with these env variables: 
```
DEFAULT_STREAM  = <M3U8 URL>
BACKUP_STREAM   = <M3U8 URL>
FIREBASE_KEY    = <FIREBASE API KEY>
AUTH_DOMAIN     = <FIREBASE AUTH DOMAIN>
PROJECT_ID      = <FIREBASE PROJECT ID>
DATABASE_URL    = <FIREBASE DATABASE URL>
STORAGE_BUCKET  = <FIREBASE STORAGE BUCKET>
```
Run node install and start
```bash
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[License](LICENSE.md)
