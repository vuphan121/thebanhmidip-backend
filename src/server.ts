import express, { Request, Response } from 'express';
import cors from 'cors';
import {get_article_data, get_article_by_id} from "./function/article";
import {get_image} from "./function/article_image";
import {trackRequest} from "./function/api_tracker";

const app = express();
app.use(cors());

app.get('/api/articles', async (_, res) => {
    try {
        await trackRequest();
        const data = await get_article_data();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// @ts-ignore
app.get('/api/articles/:id', async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    try {
        await trackRequest()
        const article = await get_article_by_id(id)
        if (!article) {
            return res.status(404).json({ error: 'Article not found' })
        }
        res.json(article)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch article by ID' })
    }
})

app.get('/api/article-image/:filename', async (req, res) => {
    const { filename } = req.params;

    try {
        await trackRequest();
        const blob = await get_image(filename);
        const buffer = Buffer.from(await blob.arrayBuffer());

        res.setHeader('Content-Type', blob.type || 'image/jpeg');
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Failed to retrieve image');
    }
});



app.listen(3001, () => {
    console.log('Server running');
});
