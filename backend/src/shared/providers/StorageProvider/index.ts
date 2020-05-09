import { container } from "tsyringe";
import IStorageProvider from "./IStorageProvider";
import DiskStorageProvider from "./DiskStorageProvider";

container.registerSingleton<IStorageProvider>(
    'DiskStorageProvider',
    DiskStorageProvider
)