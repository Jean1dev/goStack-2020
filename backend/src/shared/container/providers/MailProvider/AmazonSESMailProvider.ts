import mailConfig from '@config/mail'
import IMailProvider from "./IMailProvider";
import ISendMailDto from "./ISendMailDto";
import { inject } from "tsyringe";
import IMailTemplateProvider from "../MailTemplateProvider/IMailTemplateProvider";
import nodemailer,{ Transporter } from "nodemailer";
import aws from 'aws-sdk'

export default class AmazonSESMailProvider implements IMailProvider {
    private client: Transporter

    constructor(@inject('MailTemplateProvider') private templateProvider: IMailTemplateProvider) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_DEFAULT_REGION
            })
        })
    }

    public async sendMail({ to, subject, templateData }: ISendMailDto): Promise<void> {
        await this.client.sendMail({
            from: `${mailConfig.defaults.name}  <${mailConfig.defaults.email}>`,
            to: `Recipient <${to.email}>`,
            subject,
            html: await this.templateProvider.parse(templateData)
        })
    }

}