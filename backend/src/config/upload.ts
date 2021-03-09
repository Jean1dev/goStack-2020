import crypto from 'crypto'
import path from 'path'
import multer from 'multer'

const FOLDER = path.resolve(__dirname, '..', '..', 'temp')
const UPLOAD_FOLDER = path.resolve(__dirname, '..', '..', 'temp', 'uploads')

export default {
    directory: FOLDER,
    updloadFolder: UPLOAD_FOLDER,
    storage: multer.diskStorage({
        destination: FOLDER,
        filename (req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex')
            const fileName = `${fileHash}-${file.originalname}`
            return callback(null, fileName)
        }
    })
}