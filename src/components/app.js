import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import RecipeRouter from './recipes/router';
import RecipeIndex from './recipes/index';
import Background from './commons/background';
import Login from './commons/Login';

import Navbar from './commons/navbar';

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div className="container">
                    <Switch>
                        <Route exact path="/" component={RecipeIndex}/>
                        <Route exact path="/login" component={Login}/>
                        <Route path="/recipes" component={RecipeRouter}/>
                    </Switch>
                </div>

                <Background/>
            </div>
        );
    }
}
