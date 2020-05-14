import handlebars from 'handlebars'
import IMailTemplateProvider, { IParseMailTemplateDto } from "./IMailTemplateProvider";

export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    
    public async parse(data: IParseMailTemplateDto): Promise<string> {
        const parseTemplate = handlebars.compile(data.template)
        return parseTemplate(data.variables)
    }

}