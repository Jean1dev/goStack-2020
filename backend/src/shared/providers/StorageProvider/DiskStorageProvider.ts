import uploadConfig from '@config/upload'
import path from 'path'
import fs from 'fs'
import IStorageProvider from "./IStorageProvider";

export default class DiskStorageProvider implements IStorageProvider {

    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.directory, file),
            path.resolve(uploadConfig.updloadFolder, file),
        )

        return file
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.updloadFolder, file)
        try {
            await fs.promises.stat(filePath)
            await fs.promises.unlink(filePath)
        } catch (error) {
            return
        }
    }
}