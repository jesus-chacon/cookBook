require('../../../styles/components/_recipes.scss');

import React, { Component } from 'react';
import {graphql, gql} from 'react-apollo';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../commons/loader';

import { ChangeBackground } from '../../actions/background';

class RecipeViewer extends Component {
    background = "https://cdn.wpsandwatch.com/var/sandwatch/storage/images/id-shared-contents/life-proof-stories/quality-time-in-the-kitchen/1228694-5-eng-GB/Cooking-Quality-time-in-the-kitchen_indesit_compressed.jpg";

    renderSteps(steps){
        return (
            steps.map(step => (
                <li key={step.id}>{step.description}</li>
            ))
        );
    }

    renderStepsBlock(){
        let recipe = this.props.data.Recipe;

        if (!!recipe.steps && recipe.steps.length > 0){
            return (
                <div>
                    <h2>Steps</h2>

                    <ul>{this.renderSteps(recipe.steps)}</ul>
                </div>
            );
        }
    }

    componentDidMount(){
        this.props.changeBackground(this.background);
    }

    render (){
        if (this.props.data.loading){
            return (<Loader/>);
        } else if (this.props.data.error) {
            return (<h1 className="text-danger">Error</h1>)
        } else {
            let recipe = this.props.data.Recipe;
            return (
                <div key={this.props.match.params.id} className="row center-xs">
                    <div className="col-xs-11 col-sm-10 col-md-8 col-lg-7 recipe-full text-left">
                        <Link to="/" className="back-link"><i className="fa fa-fw fa-angle-left"/> Back</Link>

                        <div className="row heading">
                            <div className="col-xs-12 col-sm-4">
                                <img className="img-responsive image center-block" src={recipe.imageUrl} alt={`Image recipe ${recipe.title}`}/>
                            </div>

                            <div className="col-xs-12 col-sm-8">
                                <h1>{recipe.title}</h1>
                                <p className="with-break-lines description">{recipe.description}</p>
                            </div>
                        </div>

                        <div className="row steps">
                            <div className="col-xs-12">
                                {this.renderStepsBlock()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeBackground: (background) => {dispatch(ChangeBackground(background))}
    };
};

const GET_RECIPE = gql`
    query recipe($recipeId: ID!){
        Recipe(id: $recipeId){
            title,
            description,
            createdAt,
            imageUrl
            steps {
                id,
                description
            }
        }
    }
`;

const component = graphql(GET_RECIPE, {options: (props)=> ({variables: {recipeId: props.match.params.id}})})(RecipeViewer);

export default connect((state)=>({state}), mapDispatchToProps)(component);
