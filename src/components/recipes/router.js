import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import RecipeIndex from './index';
import RecipeCreate from './create';
import RecipeViewer from './viewer';
import RecipeSearch from './search';

class RecipeRouter extends Component {
    render(){
        return (
            <Switch>
                <Route exact path="/recipes" component={RecipeIndex}/>
                <Route exact path="/recipes/create" component={RecipeCreate}/>
                <Route path="/recipes/viewer/:id" component={RecipeViewer}/>
                <Route exact path="/recipes/search" component={RecipeSearch}/>
                <Route exact path="/recipes/top" component={RecipeIndex}/>
                <Route exact path="/recipes/new/:page" component={RecipeIndex}/>
            </Switch>
        );
    }
}

export default RecipeRouter;
