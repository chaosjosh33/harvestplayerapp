import dotenv from 'dotenv'
import Analytics from 'electron-google-analytics'

const env = dotenv.config().parsed
const DefaultStream = {
    file: env.DEFAULT_STREAM,
    title: "default"
}
const BackupStream = {
    file: env.BACKUP_STREAM,
    title: "backup"
}
const GA = new Analytics(env.GA_TRACKING_ID)
const Firebase = {
    apiKey: env.FIREBASE_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    databaseURL: env.DATABASE_URL,
    storageBucket: env.STORAGE_BUCKET,
}
console.log(env.GA_TRACKING_ID)
export { DefaultStream, BackupStream, GA, Firebase }
