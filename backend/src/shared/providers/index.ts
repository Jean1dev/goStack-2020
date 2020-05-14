import { container } from "tsyringe";
import IStorageProvider from "./StorageProvider/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/DiskStorageProvider";
import IMailProvider from "./MailProvider/IMailProvider";
import EtherialMailProvider from "./MailProvider/EtherialMailProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/HandlebarsMailTemplateProvider";
import IMailTemplateProvider from "./MailTemplateProvider/IMailTemplateProvider";

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherialMailProvider)
)