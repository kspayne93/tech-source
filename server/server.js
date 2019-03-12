const express = require('express');
const NewsAPI = require('newsapi');
require('dotenv').config();

const app = express(); //Express server

const { SERVER_PORT, NEWS_API_KEY } = process.env; //Environment Variables
const newsapi = new NewsAPI(NEWS_API_KEY);

app.listen(SERVER_PORT, () => {
   console.log(`Listening on port: ${SERVER_PORT}`)
})


//MIDDLEWARE
app.use(express.json()); //JSON parser


//ENDPOINTS
//Get Trending Stories
app.get('/topHeadlines/:page', async (req, res) => {
   const { page } = req.params;
   let articles = await newsapi.v2.topHeadlines({
      category: 'technology',
      language: 'en',
      country: 'us',
      page: `${page}`
   })
   res.status(200).send(articles)
})

//Get News Sources
app.get('/sources', async (req, res) => {
   let sources = await newsapi.v2.sources({
      category: 'technology',
      language: 'en',
   })
   res.status(200).send(sources)
})

//Search Query
app.get('/search', async (req, res) => {
   const { q, sortBy, page } = req.query;
   let searchResults = await newsapi.v2.everything({
      q: `${q}`,
      sources: 'ars-technica, crypto-coin-news, engadget, hackernews, recode, techcrunch, techradar, the-next-web, the-verge, wired',
      language: 'en',
      sortBy: `${sortBy}`,
      page: `${page}`,
   });
   res.status(200).send(searchResults);
})