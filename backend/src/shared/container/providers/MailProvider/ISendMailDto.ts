import { IParseMailTemplateDto } from "../MailTemplateProvider/IMailTemplateProvider";

interface IMailContact {
    name: string
    email: string
}

export default interface ISendMailDto {
    to: IMailContact
    from?: IMailContact
    subject: string
    templateData: IParseMailTemplateDto
}