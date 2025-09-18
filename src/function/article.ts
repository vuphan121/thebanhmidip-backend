import {SupabaseTable} from "../db/supabase_table";
import 'dotenv/config';

export type Article = {
    id?: string;
    title: string;
    content: string;
    summary: string;
    image_name: string;
    issue_id?: string;
    title_link?: string;
    created_at?: string;
    image_source_name?: string;
    image_source_link?: string;
};


const API_URL = process.env.SUPABASE_API_URL!;
const API_KEY = process.env.SUPABASE_API_KEY!;


async function saveArticle(
    id: string | null,
    title: string,
    content: string,
    summary: string,
    image_name: string
): Promise<void> {
    const articleTable = new SupabaseTable("article", API_URL, API_KEY);
    if (!id) {
        const newArticle: Article = {
            title: title,
            content: content,
            summary: summary,
            image_name: image_name
        };
        const result = await articleTable.add_row(newArticle);
        console.log('Inserted:', result);
    } else {
        const result = await articleTable.update_by_id(id, {
            title,
            content,
        });
        console.log('Updated:', result);
    }
}

export async function get_article_data(): Promise<
    Pick<Article, 'id' | 'title' | 'summary' | 'image_name' | 'created_at' | 'issue_id' >[]
> {
    const articleTable = new SupabaseTable<Article>('article', API_URL, API_KEY)
    const allArticles = await articleTable.get_data()

    return allArticles.map(({ id, title, summary, image_name, created_at, issue_id }) => ({
        id,
        title,
        summary,
        image_name,
        created_at,
        issue_id
    }))
}

export async function get_article_by_id(id: string): Promise<Article | null> {
    const articleTable = new SupabaseTable<Article>('article', API_URL, API_KEY)
    const result = await articleTable.get_row_by_id(id)
    return result ?? null
}

export async function get_articles_by_article_id_issue(id: string): Promise<Article[] | null> {
    const articleTable = new SupabaseTable<Article>('article', API_URL, API_KEY);

    const targetArticle = await articleTable.get_row_by_id(id);
    if (!targetArticle || !targetArticle.issue_id) {
        return null;
    }

    const allInSameIssue = await articleTable.get_data({ issue_id: targetArticle.issue_id });
    return allInSameIssue;
}


