require('./recipes.scss');

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeFull extends Component {
    render (){
        return (
            <div className="recipe-full">
                <Link to="/"><i className="fa fa-fw fa-angle-left"/> Back</Link>

                <h1>Title {this.props.match.params.id}</h1>

                <p>Description</p>

                <h2>Steps</h2>
                <ul>
                    <li>Step 1</li>
                    <li>Step 2</li>
                    <li>Step 3</li>
                    <li>Step 4</li>
                </ul>
            </div>
        );
    };
}

export default RecipeFull;