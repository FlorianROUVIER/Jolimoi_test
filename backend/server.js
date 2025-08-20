require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const convertToRomanNumber = require('./romanConvert');


app.use(cors({
    origin: 'http://localhost:5173', // authorize only frontend (vue.js localhost:5173)  
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());


app.post('/convert', (req, res) => {
    try {
        const { number } = req.body;
        // Test for POSTMAN or If we don't specify  the input to limit between 0 and 100 and the type of variable
        if (typeof number !== 'number' || !Number.isInteger(number) || number < 0 || number > 100) {
            return res.status(400).json({ error: 'Please provide an integer between 0 and 100' });
        }
        const romanResult = convertToRomanNumber(number);
        res.json({ romanResult });
        // console.log(`Converted ${number} to ${romanResult}`);

    } catch (error) {
        console.error('Error converting number:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});