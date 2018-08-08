import dotenv from 'dotenv'

const env = dotenv.config().parsed
const defaultStream = {
    file: env.DEFAULT_STREAM,
    title: "default"
}
const backupStream = {
    file: env.BACKUP_STREAM,
    title: "backup"
}
const config = {
    apiKey: env.FIREBASE_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    databaseURL: env.DATABASE_URL,
    storageBucket: env.STORAGE_BUCKET,
}
export default { defaultStream, backupStream, config }
