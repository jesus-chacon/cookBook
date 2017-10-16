require('../../../styles/components/_recipes.scss');

import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import LaddaButton, { EXPAND_LEFT} from 'react-ladda';
import { connect } from 'react-redux';

import { ChangeBackground } from '../../actions/background';
import { GC_USER_ID } from "../constants";

class RecipeCreate extends Component {
    state = {
        title: "",
        description: "",
        summary: "",
        imageUrl: "",
        owner: localStorage.getItem(GC_USER_ID),
        isSaving: false
    };

    componentDidMount(){
        this.props.changeBackground('');
    }

    render (){
        return (
            <div>
                <h2>Recipe creator</h2>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={(e) => this.setState({title: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" id="description" rows="10" className="form-control"
                              onChange={(e) => this.setState({description: e.target.value})}>
                    </textarea>
                </div>

                <div className="form-group">
                    <label>Summary</label>
                    <textarea name="summary" id="summary" rows="5" className="form-control"
                              onChange={(e) => this.setState({summary: e.target.value})}>
                    </textarea>
                </div>

                <div className="form-group">
                    <label>ImageUrl</label>
                    <input type="url" className="form-control" onChange={(e) => this.setState({imageUrl: e.target.value})}/>
                </div>

                <div className="form-group">
                    <LaddaButton loading={this.state.isSaving} onClick={() => {this._createRecipe()}}
                                 className="btn btn-success" data-style={EXPAND_LEFT}>
                        Create
                    </LaddaButton>
                </div>
            </div>
        );
    };

    _createRecipe = async () => {
        this.state.isSaving = true;
        const { title, description, summary, imageUrl, owner } = this.state;
        let newRecipe = await this.props.createRecipeMutation({
            variables: {
                title,
                description,
                summary,
                imageUrl,
                owner
            }
        });

        this.state.isSaving = false;
        this.props.history.push('/');
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeBackground: (background) => { dispatch(ChangeBackground(background)) }
});

const CREATE_RECIPE = gql`
    mutation CreateRecipeMutation($title: String!, $description: String!, $summary: String!, $imageUrl: String!, $owner: ID!){
        createRecipe(title: $title, description: $description, summary: $summary, imageUrl: $imageUrl, ownerId: $owner){
            id,
            title,
            description,
            owner {
                id,
                name
            }
        }
    }
`;

const component = graphql(CREATE_RECIPE, {name: 'createRecipeMutation'})(RecipeCreate);

export default connect((state)=>({state}), mapDispatchToProps)(component);