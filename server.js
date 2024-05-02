const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/call-external-api', async (req, res) => {

    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const response = await fetch("https://ytshorts.savetube.me/api/v1/terabox-downloader", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(req.body),
        });

        const responseData = await response.json();
        res.send(responseData);
    } catch (error) {
        console.error('Error calling external API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = process.env.PORT || 8000;

app.listen(port, (err, data) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log(`server listening on port: ${port}`);
  }
});