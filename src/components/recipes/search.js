import React, { Component } from 'react';
import { gql, withApollo } from 'react-apollo';

import RecipeCard from './card';
import Loader from '../commons/loader';

class Search extends Component {
    state = {
        searchText:'',
        recipes: [],
        isLoading: false
    };

    renderRecipes(){
        return (
            this.state.recipes.map(recipe => (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 equalHeightCol" style={{paddingTop: '5px', paddingBottom: '15px'}} key={recipe.id}>
                    <RecipeCard recipe={recipe} updateCacheAfterLike={this._updateCacheAfterLike} updateCacheAfterRemoveLike={this._updateCacheAfterRemoveLike}/>
                </div>
            ))
        );
    }

    render() {
        return (
            <div>
                <h2>Search</h2>

                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-10 col-md-7 col-lg-6">
                        <div className="form-group">
                            <input type="text" className="form-control search-input" placeholder="Type something"
                                   onChange={(e)=> this.setState({searchText: e.target.value})}
                                   onKeyPress={(e) => {(e.key === 'Enter')?this._searchRecipes():null}}/>
                        </div>
                    </div>

                    <div className="col-xs-12"/>

                    {this.state.isLoading? <Loader/>: this.renderRecipes()}
                </div>
            </div>
        );
    }

    _updateCacheAfterLike = (store, createLike, recipeId) => {};

    _updateCacheAfterRemoveLike = (store, deleteLike, recipeId, likeId) => {};

    _searchRecipes = async () => {
        console.log('Update search', this.state.searchText);
        if (this.state.searchText.trim().length > 0){
            this.setState({isLoading: true});
            const result = await this.props.client.query({
                query: ALL_RECIPES_SEARCH,
                variables: {
                    searchText: this.state.searchText.trim()
                }
            });

            this.setState({recipes: result.data.allRecipes, isLoading: false});
        }
    }
}

const ALL_RECIPES_SEARCH = gql`
    query AllRecipesSearch($searchText: String!){
        allRecipes(filter: {
            OR: [
                {title_contains: $searchText},
                {description_contains: $searchText},
                {summary_contains: $searchText}
            ]
        }) {
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

export default withApollo(Search);