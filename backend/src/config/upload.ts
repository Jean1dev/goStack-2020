import crypto from 'crypto'
import path from 'path'
import multer from 'multer'

const FOLDER = path.resolve(__dirname, '..', '..', 'temp')
export default {
    directory: FOLDER,
    
    storage: multer.diskStorage({
        destination: FOLDER,
        filename (req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('HEX')
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}