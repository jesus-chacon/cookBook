import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import RecipeIndex from './index';
import RecipeCreate from './create';
import RecipeViewer from './viewer';

class RecipeRouter extends Component {
    render(){
        return (
            <Switch>
                <Route exact path="/recipes" component={RecipeIndex}/>
                <Route exact path="/recipes/create" component={RecipeCreate}/>
                <Route path="/recipes/:id" component={RecipeViewer}/>
            </Switch>
        );
    }
}

export default RecipeRouter;
