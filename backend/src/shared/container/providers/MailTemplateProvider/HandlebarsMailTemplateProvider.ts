import handlebars from 'handlebars'
import IMailTemplateProvider, { IParseMailTemplateDto } from "./IMailTemplateProvider";
import fs from 'fs'

export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    
    public async parse(data: IParseMailTemplateDto): Promise<string> {
        const templateFileContent = await fs.promises.readFile(data.file, {
            encoding: 'utf-8'
        })
        const parseTemplate = handlebars.compile(templateFileContent)
        return parseTemplate(data.variables)
    }

}