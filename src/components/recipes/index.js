import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { ChangeBackground } from "../../actions/background";
import RecipeCard from './card';

class RecipesIndex extends Component {
    renderRecipes(){
        return (
            this.props.allRecipes.allRecipes.map(recipe => (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 equalHeightCol" style={{paddingTop: '5px', paddingBottom: '15px'}} key={recipe.id}>
                    <RecipeCard recipe={recipe} updateCacheAfterLike={this._updateCacheAfterLike} updateCacheAfterRemoveLike={this._updateCacheAfterRemoveLike}/>
                </div>
            ))
        );
    }

    render(){
        if (this.props.allRecipes.loading){
            return (<h1 className="text-info">Loading...</h1>);
        } else if (this.props.allRecipes.error){
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

    componentDidMount(){
        //this.props.changeBackground("");
        this._subscribeToNewRecipes();
        this._subscribeToNewLikes();
    }

    _updateCacheAfterLike = (store, createLike, recipeId) => {
        /*// 1 Load the store
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
        store.writeQuery({ query: ALL_RECIPES, data });*/
    };

    _updateCacheAfterRemoveLike = (store, deleteLike, recipeId, likeId) => {
        /*const data = store.readQuery({ query: ALL_RECIPES });

        data.allRecipes = _.map(data.allRecipes, recipe => {
            if (recipe.id === recipeId) {
                _.remove(recipe.likes, like => like.id === likeId);
            }

            return recipe;
        });

        store.writeQuery({ query: ALL_RECIPES, data });*/
    };

    _subscribeToNewRecipes = () => {
        this.props.allRecipes.subscribeToMore({
            document: gql`
                subscription {
                    Recipe(filter: { mutation_in: [CREATED] }) {
                        node {
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
                }
            `,
            updateQuery: (previous, {subscriptionData}) => {
                const newAllRecipes = [subscriptionData.data.Recipe.node, ...previous.allRecipes];
                return { ...previous, allRecipes: newAllRecipes };
            }
        });
    };

    _subscribeToNewLikes = () => {
        this.props.allRecipes.subscribeToMore({
            document: gql`
                subscription {
                    Like(filter: { mutation_in: [CREATED] }) {
                        node {
                            id, 
                            recipe {
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
                            },
                            user {
                               id
                            }
                        }
                    }
                }
            `,
            updateQuery: (previous, {subscriptionData}) => {
                console.log('update', subscriptionData);
                const likeRecipeIndex = previous.allRecipes.findIndex(recipe => recipe.id === subscriptionData.data.Like.node.recipe.id);
                const recipe = subscriptionData.data.Like.node.recipe;
                const newAllRecipes = previous.allRecipes.slice();
                newAllRecipes[likeRecipeIndex] = recipe;

                return { ...previous, allRecipes: newAllRecipes };
            }
        });
    };
}

const mapDispatchToProps = (dispatch) => ({
    changeBackground: (background) => { dispatch(ChangeBackground(background)) }
});

export const ALL_RECIPES = gql`
    query {
        allRecipes {
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

const component = graphql(ALL_RECIPES, {name: 'allRecipes'})(RecipesIndex);
export default component;
//export default connect((state) => ({state}), mapDispatchToProps)(component);