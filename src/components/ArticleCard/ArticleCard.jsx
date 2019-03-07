import React from 'react';
import './ArticleCard.scss';
import moment from 'moment';


export default function ArticleCard(props) {
   const { source, title, description, urlToImage, publishedAt, url } = props.article;
   let date = moment(publishedAt, 'YYYY-MM-DD').format('dddd, MMMM Do YYYY')
   return (
         <div className='article-card-main'>
            <div className='img-container'>
               <img src={urlToImage} alt="article" />
            </div>
            <div className="article-info">
               <div>
                  <h3>{title}</h3>
                  <p>{source.name}</p>
                  <p>{date}</p>
               </div>
               <div>
                  <p>{description}</p>
               </div>
            </div>
         </div>
   )
}
