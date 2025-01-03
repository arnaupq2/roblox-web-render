const express = require('express');
const sharp = require('sharp');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/buscar', async (req, res) => {
    const query = req.body.query;

    try {
        const response = await axios.get(query, { responseType: 'arraybuffer' });
        const imageBuffer = await sharp(response.data)
            .resize(64, 64)
            .raw()
            .toBuffer();

        const width = 64;
        const height = 64;

        res.json({ 
            width,
            height,
            data: Array.from(imageBuffer),
        });
    } catch (error) {
        res.status(500).json({ error: 'Error procesando la imagen.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
