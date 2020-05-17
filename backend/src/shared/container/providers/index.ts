import mailConfig from '@config/mail'
import { container } from "tsyringe";
import IStorageProvider from "./StorageProvider/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/DiskStorageProvider";
import IMailProvider from "./MailProvider/IMailProvider";
import EtherialMailProvider from "./MailProvider/EtherialMailProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/HandlebarsMailTemplateProvider";
import IMailTemplateProvider from "./MailTemplateProvider/IMailTemplateProvider";
import AmazonSESMailProvider from './MailProvider/AmazonSESMailProvider';
import S3StorageProvider from './StorageProvider/S3StorageProvider';
import ICacheProvider from './CacheProvider/ICacheProvider';
import RedisCacheProvider from './CacheProvider/RedisCacheProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    process.env.NODE_ENV === 'dev' ?
    DiskStorageProvider :
    S3StorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailConfig.driver === 'etherial' ?
        container.resolve(EtherialMailProvider) :
        container.resolve(AmazonSESMailProvider)
)

container.registerSingleton<ICacheProvider>(
    'CacheProvider',
    RedisCacheProvider
)