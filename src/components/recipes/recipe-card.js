require('./recipes.scss');

import React, { Component } from 'react';

class RecipeCard extends  Component {
    render (){
        return (
            <div className="recipe-card">
                {this.props.title}
            </div>
        );
    };
}

export default RecipeCard;