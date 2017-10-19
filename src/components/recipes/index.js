import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { ChangeBackground } from "../../actions/background";
import RecipeCard from './card';

import { LINKS_PER_PAGE } from "../constants";

class RecipesIndex extends Component {
    renderRecipes(){
        const isNewPage = this.props.location.pathname.includes('new');
        const recipesToRender = this._getRecipesToRender(isNewPage);

        return (
            recipesToRender.map(recipe => (
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
            const isNewPage = this.props.location.pathname.includes('new');

            return (
                <div>
                    <h1>Recipes</h1>

                    <div className="row equalHeightColsRow">
                        {this.renderRecipes()}
                    </div>

                    { isNewPage &&
                        <div className="row center-xs around-sm">
                            { parseInt(this.props.match.params.page, 10) > 1 &&
                                <div className="col-xs-6 col-sm-4 col-md-2">
                                    <button className='btn btn-success' onClick={() => this._previousPage()}>Previous page</button>
                                </div>
                            }

                            { this.props.allRecipes._allRecipesMeta.count > (LINKS_PER_PAGE * parseInt(this.props.match.params.page, 10)) &&
                                <div className="col-xs-6 col-sm-4 col-md-2">
                                    <button className='btn btn-success' onClick={() => this._nextPage()}>Next page</button>
                                </div>
                            }
                        </div>
                    }
                </div>
            );
        }
    }

    componentDidMount(){
        this.props.changeBackground("");
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

    _getRecipesToRender = (isNewPage) => {
        console.log(this.props.allRecipes);
        if (isNewPage) {
            return this.props.allRecipes.allRecipes;
        }
        const recipeLike = this.props.allRecipes.allRecipes.slice();
        recipeLike.sort((l1, l2) => l2.likes.length - l1.likes.length);
        return recipeLike;
    };

    _nextPage = () => {
        const page = parseInt(this.props.match.params.page, 10);
        if (page <= this.props.allRecipes._allRecipesMeta.count / LINKS_PER_PAGE) {
            const nextPage = page + 1;
            this.props.history.push(`/recipes/new/${nextPage}`);
        }
    };

    _previousPage = () => {
        const page = parseInt(this.props.match.params.page, 10);
        if (page > 1) {
            const previousPage = page - 1;
            this.props.history.push(`/recipes/new/${previousPage}`);
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    changeBackground: (background) => { dispatch(ChangeBackground(background)) }
});

export const ALL_RECIPES = gql`
    query AllRecipes ($first: Int, $skip: Int, $orderBy: RecipeOrderBy){
        allRecipes (first: $first, skip: $skip, orderBy: $orderBy){
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
        _allRecipesMeta {
            count
        }
    }
`;

const component = graphql(ALL_RECIPES, {
    name: 'allRecipes',
    options: (ownProps) => {
        const page = parseInt(ownProps.match.params.page, 10);
        const isNewPage = ownProps.location.pathname.includes('new');
        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
        const first = isNewPage ? LINKS_PER_PAGE : 100;
        const orderBy = isNewPage ? 'createdAt_DESC' : null;
        return {
            variables: { first, skip, orderBy }
        }
    }
})(RecipesIndex);

export default connect((state) => ({state}), mapDispatchToProps)(component);