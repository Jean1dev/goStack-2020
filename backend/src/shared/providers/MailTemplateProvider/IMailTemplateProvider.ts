export interface IParseMailTemplateDto {
    template: string
    variables: object
}

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDto): Promise<string>
}