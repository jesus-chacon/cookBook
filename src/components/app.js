import React, { Component } from 'react';
import RecipesIndex from './recipes/recipes-index';
import Navbar from './commons/navbar';

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div className="container">
                    <RecipesIndex/>
                </div>
            </div>
        );
    }
}
