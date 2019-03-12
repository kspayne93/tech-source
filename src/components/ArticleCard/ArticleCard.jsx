import React, { Component } from 'react';
import './ArticleCard.scss';
import moment from 'moment';


export default class ArticleCard extends Component {
   state = {
      showArticle: false,
   }

   hideArticle = async () => {
      await this.setState({ showArticle: false })
   }

   render() {
      const { source, title, author, description, urlToImage, publishedAt, url } = this.props.article;
      let date = moment(publishedAt, 'YYYY-MM-DD').format('dddd, MMMM Do YYYY');
      let href = `https://www.${source.name}`;

      return (
         <div className='article-card-main' >
            <a href={url} target='_blank' rel="noopener noreferrer">
               <div className='img-container'>
                  <img src={urlToImage} alt="article" />
               </div>
            </a>
            <div className="article-info">
               <div className='article-header'>
                  <div>
                     <a href={url} target='_blank' rel="noopener noreferrer">
                  <h3>{title}</h3>
                  </a>
                  </div>
                  <div>
                     <span style={{ color: 'gray' }}>By: {author} | </span>
                     <span style={{ color: 'gray'}} >{date} | </span>
                     <span> <a href={href} target='_blank' rel='noopener noreferrer' style={{ color: 'salmon' }} >{source.name}</a> </span>
                  </div>
               </div>
               <div>
                  <p>{description}</p>
               </div>
            </div>
         </div>
      )
   }
}
