import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeIndex from './index';
import RecipeCreate from './create';
import RecipeFull from './viewer';

const RecipeRouter = () => (
    <Switch>
        <Route exact path="/recipes" component={RecipeIndex}></Route>
        <Route exact path="/recipes/create" component={RecipeCreate}></Route>
        <Route path="/recipes/:id" component={RecipeFull}></Route>
    </Switch>
);

export default RecipeRouter;
