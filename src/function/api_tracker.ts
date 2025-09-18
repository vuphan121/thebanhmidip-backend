import {RequestTracker} from "../db/redis_hook";
import 'dotenv/config';

const redisURL = process.env.REDIS_URL;
if (!redisURL) {
    throw new Error('Cannot find REDIS_URL');
}
const tracker = new RequestTracker(redisURL);

export async function trackRequest(): Promise<void> {
    await tracker.incrementRequestCount();
}
