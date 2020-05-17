import ICacheProvider from "./ICacheProvider";

export default class MockRedisCacheProvider implements ICacheProvider {

    public async save(key: string, value: any): Promise<void> {
        
    }

    public async get<T>(key: string): Promise<T | null> {
        return null
    }

    public async invalidate(key: string): Promise<void> {
        
    }
    
    public async invalidatePrefix(prefix: string): Promise<void> {
        
    }

}