import IMailProvider from "./IMailProvider";
import ISendMailDto from "./ISendMailDto";

export default class MailProviderMock implements IMailProvider {
    private message: ISendMailDto

    public async sendMail(message: ISendMailDto): Promise<void> {
        this.message = message
    }

}