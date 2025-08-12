require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const convertToRomanNumber = require('./romanConvert');


app.use(cors({
    origin: 'http://localhost:5173', // authorize only frontend (vue.js localhost:5173)  
    methods: ['GET'],
}));

app.use(express.json());


app.get('/convert-sse', (req, res) => {

    // Headers for Server side event
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': 'http://localhost:5173',

    });

    try {
        // Get the number in the query
        const number  = Number(req.query.number);
        // Message error  gestion
        if (typeof number !== 'number' || !Number.isInteger(number) || number < 0 || number > 100) {
            return res.status(400).json({ error: 'Please provide an integer between 0 and 100' });
        }
        const romanResult = convertToRomanNumber(number);
        res.write(`event: result\ndata: ${ romanResult }\n\n`);
        // console.log(`Converted number ${number} to Roman numeral: ${romanResult}`);
        res.end();

    } catch (error) {
        console.error('Error in SSE conversion:', error);
        res.write(`event: error\ndata: Internal server error\n\n`);
        res.end();
    }

});

app.listen(PORT, () => {
    console.log(`SSE Server running at http://localhost:${PORT}`);
});