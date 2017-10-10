import React, { Component } from 'react';
import {graphql, gql} from 'react-apollo';
import RecipeCard from './recipe-card';

class RecipesIndex extends Component {
    renderRecipes(){
        return (
            this.props.data.allRecipes.map(recipe => (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" style={{paddingTop: '5px', paddingBottom: '5px'}} key={recipe.id}><RecipeCard recipe={recipe}/></div>
            ))
        );
    }

    render(){
        if (this.props.data.loading){
            return (<h1 className="text-info">Loading...</h1>);
        }

        if (this.props.data.error){
            return (<h1 className="text-danger">Error</h1>)
        }

        return (
            <div>
                <h1>Recipes</h1>

                <div className="row">
                    {this.renderRecipes()}
                </div>
            </div>
        );
    }
}

const getAllRecipesQuery = gql`
    query {
        allRecipes{
            id,
            title,
            imageUrl,
            summary
            steps {
                description
            }
        }
    }
`;

export default graphql(getAllRecipesQuery)(RecipesIndex);