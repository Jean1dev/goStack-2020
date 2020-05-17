import { RateLimiterRedis } from 'rate-limiter-flexible'
import { Request, Response, NextFunction } from "express";
import redis from 'redis'
import redisConfig from '@config/cache'
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
    host: redisConfig.config.redis.host,
    port: redisConfig.config.redis.port,
    password: redisConfig.config.redis.password
})

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rate-limit',
    points: 5,
    duration: 1
})

export default async function rateLimit(request: Request, response: Response, next: NextFunction) {
    try {
        await rateLimiter.consume(request.ip)
        return next()
    } catch (error) {
        throw new AppError('Too many requests', 429)
    }
}