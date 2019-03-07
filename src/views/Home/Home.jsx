import React, { Component } from 'react';
import axios from 'axios';
import './Home.scss';
import Navbar from '../../components/Navbar/Navbar';
import ArticleCard from '../../components/ArticleCard/ArticleCard';


export default class Home extends Component {
   state = {
      articles: [],
      page: 1,
   }

   componentDidMount = async () => {
      await this.getTrendingArticles();
   }

   getTrendingArticles = async () => {
      const key = await axios.get('/key'); //fetching api key from local server (.env file)
      const { page } = this.state;
      try {
         let res = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            'headers': { 'Authorization': key.data },
            'params': { 'country': 'us', 'category': 'technology', 'page': page }
         })
         await this.setState({ articles: res.data.articles })
         console.log('articles retrieved')
      } catch(error) {
         console.log(error)
      }
   }

   handlePageClick = async (num) => {
      await this.setState({ page: this.state.page + num })
      if (this.state.page <= 1) {
         this.setState({ page: 1 })
      }
      await this.getTrendingArticles();
   }


   render() {
      const { articles } = this.state;
      let articleCards = articles.map(article => {
         return (
            < ArticleCard
               key={article.title}
               article={article}
            />
         )
      })

      return (
         <div className='homepage-main'>
            <Navbar />
            <div className='page-subheader'>
               <h1>Trending Stories</h1>
               {
                  this.state.articles.length > 0 &&
                  <div className='page-button-container'>
                     <button onClick={() => this.handlePageClick(-1)}>Previous Page</button>
                     <button onClick={() => this.handlePageClick(1)}>Next Page</button>
                  </div>
               }
            </div>
            <div className="home-content">
               <div className="article-container">
                  {articleCards}
               </div>
               {
                  this.state.articles.length > 0 &&
                  <div className='page-button-container'>
                     <button onClick={() => this.handlePageClick(-1)}>Previous Page</button>
                     <button onClick={() => this.handlePageClick(1)}>Next Page</button>
                  </div>
               }
            </div>
         </div>
      )
   }
}
