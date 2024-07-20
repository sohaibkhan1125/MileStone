const express = require('express');
const axios = require('axios'); // Use axios instead of request
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/download', async (req, res) => {
    const { videoUrl } = req.query;
    
    try {
        const response = await axios.get(`https://social-media-video-downloader.p.rapidapi.com/smvd/get/all?url=${encodeURIComponent(videoUrl)}`, {
            headers: {
                'x-rapidapi-key': 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564',
                'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
