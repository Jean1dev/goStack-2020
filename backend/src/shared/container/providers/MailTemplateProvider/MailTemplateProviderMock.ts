import IMailTemplateProvider, { IParseMailTemplateDto } from "./IMailTemplateProvider";

export default class MailTemplateProviderMock implements IMailTemplateProvider {
    
    public async parse(data: IParseMailTemplateDto): Promise<string> {
        return "mock"
    }

}