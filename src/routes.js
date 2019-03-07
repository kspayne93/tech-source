import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../src/views/Landing/Landing';
import Home from '../src/views/Home/Home';
import NewsSources from '../src/views/NewsSources/NewsSources';
import Search from '../src/views/Search/Search';


export default (
   <Switch>
      <Route component={Landing} exact path='/' ></Route>
      <Route component={Home} path='/home' ></Route>
      <Route component={NewsSources} path='/sources' ></Route>
      <Route component={Search} path='/search' ></Route>
   </Switch>
)