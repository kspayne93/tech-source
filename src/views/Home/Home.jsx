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
      const { page } = this.state;
      console.log(
         `%cPage #: %c${page}`, // Console Message
         'color: salmon', 'color: lightBlue' // CSS Style
      );
      try {
         let res = await axios.get(`/topHeadlines/${page}`)
         await this.setState({ articles: res.data.articles })
      } catch (error) {
         console.log(error)
      }
   }

   handlePageClick = async (num) => {
      await this.setState({ page: this.state.page + num })
      if (this.state.page <= 1) {
         await this.setState({ page: 1 })
      } else if (this.state.page >= 5) {
         await this.setState({ page: 4 })
      }
      await this.getTrendingArticles();
      await window.scrollTo(0, 0);
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
               <div></div>
               <div>
                  <h1>Trending Stories</h1>
               </div>
               <div>
                  {
                     this.state.articles.length > 0 &&
                     <div className='page-button-container top-buttons'>
                        {
                           this.state.page > 1 &&
                           <button onClick={() => this.handlePageClick(-1)}> <i className="fas fa-arrow-left"></i> </button>
                        }
                        {
                           this.state.page < 4 &&
                           <button onClick={() => this.handlePageClick(1)}> <i className="fas fa-arrow-right"></i> </button>
                        }
                     </div>
                  }
               </div>
            </div>
            <div className="home-content">
               <div className="article-container">
                  {articleCards}
               </div>
               {
                  this.state.articles.length > 0 &&
                  <div className='page-button-container'>
                     {
                        this.state.page > 1 &&
                        <button onClick={() => this.handlePageClick(-1)}> <i className="fas fa-arrow-left"></i> </button>
                     }
                     {
                        this.state.page < 4 &&
                        <button onClick={() => this.handlePageClick(1)}> <i className="fas fa-arrow-right"></i> </button>
                     }
                  </div>
               }
               <h6>Powered by NewsAPI.org</h6>
            </div>
         </div>
      )
   }
}
