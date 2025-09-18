import express from 'express';
import cors from 'cors';
import {get_article_data} from "./function/article";
import {get_image} from "./function/article_image";

const app = express();
app.use(cors());

app.get('/api/articles', async (_, res) => {
    try {
        const data = await get_article_data();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

app.get('/api/article-image/:filename', async (req, res) => {
    const { filename } = req.params;

    try {
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

