export interface IParseMailTemplateDto {
    file: string
    variables: object
}

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDto): Promise<string>
}