const express = require('express');
require('dotenv').config();

const app = express(); //Express server

const { SERVER_PORT, NEWS_API_KEY } = process.env; //Environment Variables

app.listen(SERVER_PORT, () => {
   console.log(`Listening on port: ${SERVER_PORT}`)
})


//MIDDLEWARE
app.use(express.json()); //JSON parser


//ENDPOINTS
app.get('/key', (req, res) => {
   res.status(200).send(NEWS_API_KEY)
})