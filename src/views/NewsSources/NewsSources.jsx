import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NewsSources.scss';
import Navbar from '../../components/Navbar/Navbar';


export default class NewsSources extends Component {
   state = {
      newsSources: [],
   }

   componentDidMount = async () => {
      await this.getNewsSources();
   }

   getNewsSources = async () => {
      try {
         let res = await axios.get(`/sources`);
         await this.setState({ newsSources: res.data.sources })
         console.log(res.data.sources)
         console.log('sources retrieved')
      } catch (error) {
         console.log(error)
      }
   }


   render() {
      const { newsSources } = this.state;
      let sources = newsSources.map(source => {
         return (
            <div
               className='news-source'
               id={source.id}
            >
               <a href={source.url} target='_blank' rel="noopener noreferrer"><h2>{source.name}</h2></a>
               <p>{source.description}</p>
            </div>
         )
      })

      return (
         <div className='sources-main'>
            <Navbar />
            <div className='page-subheader'>
               <h1>News Sources</h1>
            </div>
            <div className="sources-content">
               <div className="sources-container">
                  {sources}
               </div>
               <h6>Powered by NewsAPI.org</h6>
            </div>
         </div>
      )
   }
}
