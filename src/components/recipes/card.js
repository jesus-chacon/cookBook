import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeCard extends Component {
    render (){
        return (
            <div className="recipe-card card equalHeight">
                <div className="heading">
                    <img className="img-responsive center-block" src={this.props.recipe.imageUrl} alt={'Image '+this.props.recipe.title}/>
                </div>

                <div className="body">
                    <p className="title">{this.props.recipe.title}</p>
                    <p className="summary">{this.props.recipe.summary}</p>
                </div>

                <div className="footer">
                    <Link to={`/recipes/${this.props.recipe.id}`} className="btn">See recipe</Link>
                </div>
            </div>
        );
    };
}

export default RecipeCard;