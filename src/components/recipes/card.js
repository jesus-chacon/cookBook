require('./recipes.scss');

import React, { Component } from 'react';

class RecipeCard extends  Component {
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
                    <button className="btn">See recipe</button>
                </div>
            </div>
        );
    };
}

export default RecipeCard;