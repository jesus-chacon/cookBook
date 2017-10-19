import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import _ from 'lodash';

class RecipeCard extends Component {
    renderLikeIcon(){
        if (this.props.auth.isLogged){
            if (!!_.find(this.props.recipe.likes, (like) => like.user.id === this.props.auth.userId)){
                return <i className="fa fa-heart-o liked fa-2x fa-fw" onClick={this._deleteLikeRecipe}/>;
            } else {
                return <i className="fa fa-heart-o fa-2x fa-fw hover" onClick={this._likeRecipe}/>;
            }
        } else {
            return <i className="fa fa-heart-o fa-2x fa-fw"/>
        }
    }

    renderLike(){
        return (
            <div>
                <span className="fa-2x">{this.props.recipe.likes.length}</span>
                {this.renderLikeIcon()}
            </div>
        );
    }

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
                    <div>
                        {this.renderLike()}
                        <Link to={`/recipes/viewer/${this.props.recipe.id}`} className="btn">See recipe</Link>
                    </div>
                </div>
            </div>
        );
    };

    _likeRecipe = async () => {
        if (_.find(this.props.recipe.likes, (like) => like.user.id === this.props.auth.userId)){
            console.log(`The user ${this.props.auth.userId} already liked this recipe`);
        } else {
            await this.props.createLikeMutation({
                variables:{
                    userId: this.props.auth.userId,
                    recipeId: this.props.recipe.id
                },
                update: (store, { data: { createLike } }) => {
                    this.props.updateCacheAfterLike(store, createLike, this.props.recipe.id)
                }
            });
        }
    };

    _deleteLikeRecipe = async () => {
        const like = _.find(this.props.recipe.likes, (like) => like.user.id === this.props.auth.userId);
        if (!!like && !!like.id){
            await this.props.deleteLikeMutation({
                variables:{ id: like.id },
                update: (store, { data: { deleteLike } }) => {
                    this.props.updateCacheAfterRemoveLike(store, deleteLike, this.props.recipe.id, like.id);
                }
            });
        }
    }
}

const mapStateToProps = ({sessionReducer}) => ({
    auth: sessionReducer.auth
});

const CREATE_LIKE_MUTATION = gql`
    mutation CreateLikeMutation($userId: ID!, $recipeId:ID!){
        createLike(userId: $userId, recipeId: $recipeId){
            id,
            recipe {
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
`;

const DELETE_LIKE_MUTATION = gql`
    mutation DeleteLikeMutation($id: ID!){
        deleteLike(id: $id){
            id,
            recipe {
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
`;

const component = compose(
    graphql(CREATE_LIKE_MUTATION, { name: 'createLikeMutation' }),
    graphql(DELETE_LIKE_MUTATION, { name: 'deleteLikeMutation' })
)(RecipeCard);

export default connect(mapStateToProps)(component);