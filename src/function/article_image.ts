import {SupabaseBucket} from "../db/supabase_bucket";
import 'dotenv/config';

const API_URL = process.env.SUPABASE_API_URL!;
const API_KEY = process.env.SUPABASE_API_KEY!;
const bucket = 'article-images';

export async function get_image(filename: string) {
    const bucketHelper = new SupabaseBucket(API_URL);
    return await bucketHelper.fetchImage(bucket, filename, API_KEY);
}

