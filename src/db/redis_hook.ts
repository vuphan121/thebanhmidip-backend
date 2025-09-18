import Redis from 'ioredis';
// @ts-ignore
import { DateTime } from 'luxon';
import 'dotenv/config';



export class RequestTracker {
    private redis: Redis;

    constructor(redisUrl: string) {
        this.redis = new Redis(redisUrl);

        this.redis.on('connect', () => {
            console.log('Redis connected');
        });

        this.redis.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    public async getAllKeys(): Promise<string[]> {
        try {
            const keys = await this.redis.keys('*');
            return keys;
        } catch (err) {
            console.error('Failed to fetch keys:', err);
            return [];
        }
    }

    public async getKeyValue(key: string): Promise<string | null> {
        try {
            const value = await this.redis.get(key);
            return value;
        } catch (err) {
            console.error(`Failed to get value for key ${key}:`, err);
            return null;
        }
    }

    public async deleteKey(key: string): Promise<void> {
        try {
            await this.redis.del(key);
            console.log(`Deleted key: ${key}`);
        } catch (err) {
            console.error(`Failed to delete key ${key}:`, err);
        }
    }

    private getHourKey(apiName: string): string {
        const nowVN = DateTime.now().setZone('Asia/Ho_Chi_Minh');
        const hourString = nowVN.toFormat("yyyy-MM-dd'T'HH");
        return `${apiName}__${hourString}`;
    }

    public async incrementRequestCount(): Promise<void> {
        const API_name = process.env.API_NAME;
        if (!API_name) {
            throw new Error('Cannot find API name');
        }
        const key = this.getHourKey(API_name);

        try {
            const exists = await this.redis.exists(key);

            if (exists) {
                await this.redis.incr(key);
            } else {
                await this.redis.set(key, 1, 'EX', 60 * 60 * 24 * 7);
            }

            console.log(`🔄 Updated request count for key: ${key}`);
        } catch (err) {
            console.error(`⚠️ Failed to increment request count:`, err);
        }
    }
}
