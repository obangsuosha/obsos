/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import Header from './Header';
import Home from '../Routes/Home';
import Movie from '../Routes/Movie';
import TV from '../Routes/TV';
import Search from '../Routes/Search';
import Detail from '../Routes/Detail';
import People from '../Routes/People';
import Profile from '../Routes/Profile';
import Collection from '../Routes/Collection';

export default () => (
    <Router>
        <Header />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movielist" exact component={Movie} />
            <Route path="/showlist" exact component={TV} />
            <Route path="/people" exact component={People} />
            <Route path="/search" exact component={Search} />
            <Route path="/movie/:id" component={Detail} />
            <Route path="/show/:id" component={Detail} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/collection/:id" component={Collection} />
            <Route path="/tv/:id/season/:number" component={Collection} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
);
