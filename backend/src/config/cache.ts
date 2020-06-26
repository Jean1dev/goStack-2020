import { RedisOptions } from "ioredis";

interface ICacheConfig {
    driver: 'redis',

    config: {
        redis: RedisOptions
    }
}

export default {
    driver: 'redis',
    config: {
        redis: {
            host: '192.168.1.5',
            port: 6379
        }
    }
} as ICacheConfig