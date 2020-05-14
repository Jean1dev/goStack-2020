import nodemailer, { Transporter } from 'nodemailer'
import IMailProvider from "./IMailProvider";
import ISendMailDto from './ISendMailDto';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../MailTemplateProvider/IMailTemplateProvider';

@injectable()
export default class EtherialMailProvider implements IMailProvider {
    private client: Transporter
    private templateProvider: IMailTemplateProvider

    constructor(
        @inject('MailTemplateProvider') templateProvider: IMailTemplateProvider
    ) {
        this.templateProvider = templateProvider

        const account = nodemailer.createTestAccount().then(account => {
            const transport = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })
    
            this.client = transport
        })
    }

    public async sendMail({ to, subject, from, templateData }: ISendMailDto): Promise<void> {
        console.log({ to, subject, from, templateData })
        const message = await this.client.sendMail( {
            from: {
                name: from?.name || 'email from jean',
                address: from?.email || 'email from jean'
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await this.templateProvider.parse(templateData)
        })

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}