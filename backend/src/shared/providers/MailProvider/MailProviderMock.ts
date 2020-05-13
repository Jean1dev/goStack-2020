import IMailProvider from "./IMailProvider";

interface Message {
    to: string
    body: string
}

export default class MailProviderMock implements IMailProvider {
    private message: Message

    public async sendMail(to: string, body: string): Promise<void> {
        this.message = {
            to,
            body
        }
    }

}