import IStorageProvider from "./IStorageProvider";
import aws from 'aws-sdk'
import path from 'path'
import uploadConfig from '@config/upload'
import fs from 'fs'
import mime from 'mime'

export default class S3StorageProvider implements IStorageProvider {
    private client: aws.S3;

    constructor() {
        this.client = new aws.S3({
            region: process.env.AWS_DEFAULT_REGION
        })
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.directory, file)
        const fileContent = await fs.promises.readFile(originalPath)
        const contentType = mime.getType(originalPath)
        if (!contentType) throw new Error('Erro ao salvar arquivo no S3')

        await this.client.putObject({
            Bucket: 'bucket',
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType: contentType
        }).promise()

        await fs.promises.unlink(originalPath)
        return file
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: 'Bucker',
            Key: file
        }).promise()
    }

}