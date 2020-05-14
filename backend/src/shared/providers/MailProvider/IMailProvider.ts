import ISendMailDto from "./ISendMailDto";

export default interface IMailProvider {
    sendMail(data: ISendMailDto): Promise<void>
}