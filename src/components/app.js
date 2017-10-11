import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import RecipeRouter from './recipes/router';
//import RecipeIndex from './recipes/index';

import RecipeIndex from './recipes/index';
import RecipeCreate from './recipes/create';

class RecipeRouter2 extends Component {
    render(){
        return (
            <Switch>
                <Route exact path="/recipes" component={RecipeIndex}></Route>
                <Route exact path="/recipes/create" component={RecipeCreate}></Route>
            </Switch>
        );
    }
};


import Navbar from './commons/navbar';

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div className="container">
                    <Switch>
                        <Route exact path="/" component={RecipeIndex}/>
                        <Route path="/recipes" component={RecipeRouter}/>
                    </Switch>
                </div>
            </div>
        );
    }
}
