import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import RecipesIndex from './recipes/index';
import RecipesCreate from './recipes/create';

import Navbar from './commons/navbar';

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div className="container">
                    <Switch>
                        <Route exact path="/" component={RecipesIndex}/>
                        <Route exact path="/create-recipe" component={RecipesCreate}/>
                    </Switch>
                </div>
            </div>
        );
    }
}
