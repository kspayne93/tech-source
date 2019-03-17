import React, { Component } from 'react';
import axios from 'axios';
import './Search.scss';
import Navbar from '../../components/Navbar/Navbar';
import ArticleCard from '../../components/ArticleCard/ArticleCard';


export default class Search extends Component {
   state = {
      articles: [],
      page: 1,
      userInput: '',
      sortBy: 'relevancy',
   }

   componentDidMount = async () => {

   }

   getArticles = async () => {
      const { page, userInput, sortBy } = this.state;
      try {
         let res = await axios.get(`/search?q=${userInput}&sortBy=${sortBy}&page=${page}`)
         await this.setState({ articles: res.data.articles })
      } catch (error) {
         console.log(error)
      }
   }

   handlePageClick = async (num) => {
      await this.setState({ page: this.state.page + num })
      if (this.state.page <= 1) {
         this.setState({ page: 1 })
      }
      await this.getArticles();
   }

   handleSelect = async (event) => {
      await this.setState({ sortBy: event.target.value });
      console.log(this.state.sortBy)
      await this.getArticles();
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
                  <input type="text" placeholder='Search' onChange={(e) => this.setState({ userInput: e.target.value })} />
                  <button onClick={() => this.getArticles()}>Search</button>
               </div>
               <div>
                  {
                     this.state.articles.length > 0 &&
                     <div className='page-button-container top-buttons'>
                        <span style={{ fontFamily: 'arial', fontSize: '12px' }} >Sort By: </span>
                        <select name="sort" id="sort" onChange={this.handleSelect} style={{ marginRight: '2rem' }}>
                           <option value="relevancy">Relevancy</option>
                           <option value="publishedAt">Most Recent</option>
                           <option value="popularity">Popularity</option>
                        </select>
                        <button onClick={() => this.handlePageClick(-1)}> <i class="fas fa-arrow-left"></i> </button>
                        <button onClick={() => this.handlePageClick(1)}> <i class="fas fa-arrow-right"></i> </button>
                     </div>
                  }
               </div>
            </div>
            <div className="home-content">
               <div className="article-container">
                  {articleCards}
                  {
                     this.state.articles.length === 0 &&
                     <>
                        {/* <h1>Search Tech News from around the globe</h1> */}
                        <i style={{color: 'gray', fontSize: '1.5rem'}}>Suggestions: "Tesla", "Apple", "Nintendo"</i>
                     </>
                  }
               </div>
               {
                  this.state.articles.length > 0 &&
                     <div className='page-button-container'>
                        <button onClick={()=> this.handlePageClick(-1)}> <i class="fas fa-arrow-left"></i> </button>
                        <p>Previous Page</p>
                        <button onClick={()=> this.handlePageClick(1)}> <i class="fas fa-arrow-right"></i> </button>
                     </div>
               }
               <h6>Powered by NewsAPI.org</h6>
            </div>
         </div>
      )
   }
}
