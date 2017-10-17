import React, { Component } from 'react';
import {graphql, gql} from 'react-apollo';
import RecipeCard from './card';

import {connect} from 'react-redux';

import {ChangeBackground} from "../../actions/background";

class RecipesIndex extends Component {
    renderRecipes(){
        return (
            this.props.data.allRecipes.map(recipe => (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 equalHeightCol" style={{paddingTop: '5px', paddingBottom: '15px'}} key={recipe.id}>
                    <RecipeCard recipe={recipe} updateCacheAfterLike={this._updateCacheAfterLike} updateCacheAfterRemoveLike={this._updateCacheAfterRemoveLike}/>
                </div>
            ))
        );
    }

    componentDidMount(){
        this.props.changeBackground("");
    }

    render(){
        if (this.props.data.loading){
            return (<h1 className="text-info">Loading...</h1>);
        } else if (this.props.data.error){
            return (<h1 className="text-danger">Error</h1>);
        } else {
            return (
                <div>
                    <h1>Recipes</h1>

                    <div className="row equalHeightColsRow">
                        {this.renderRecipes()}
                    </div>
                </div>
            );
        }
    }

    _updateCacheAfterLike = (store, createLike, recipeId) => {
        // 1 Load the store
        const data = store.readQuery({ query: ALL_RECIPES });
        // 2 modify the store
        let recipeLiked = data.allRecipes.find(recipe => recipe.id === recipeId);
        recipeLiked.likes = createLike.recipe.likes;
        data.allRecipes = _.map(data.allRecipes, recipe => {
            if (recipe.id === recipeId){
                return recipeLiked;
            }else {
                return recipe;
            }
        });

        // 3 updating the store
        store.writeQuery({ query: ALL_RECIPES, data });
    };

    _updateCacheAfterRemoveLike = (store, deleteLike, recipeId, likeId) => {
        const data = store.readQuery({ query: ALL_RECIPES });

        data.allRecipes = _.map(data.allRecipes, recipe => {
            if (recipe.id === recipeId) {
                _.remove(recipe.likes, like => like.id === likeId);
            }

            return recipe;
        });

        store.writeQuery({ query: ALL_RECIPES, data });
    };
}

const mapDispatchToProps = (dispatch) => ({
    changeBackground: (background) => { dispatch(ChangeBackground(background)) }
});

export const ALL_RECIPES = gql`
    query {
        allRecipes{
            id,
            title,
            imageUrl,
            summary,
            likes {
                id,
                user {
                    id
                }
            }
        }
    }
`;

const component = graphql(ALL_RECIPES)(RecipesIndex);

export default connect((state) => ({state}), mapDispatchToProps)(component);