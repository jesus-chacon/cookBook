import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { gql, graphql } from 'react-apollo';

import { FullLogin, Logout } from '../actions/session';
import { GC_AUTH_TOKEN, GC_USER_ID } from "./constants";

import RecipeRouter from './recipes/router';
import RecipeIndex from './recipes/index';
import Background from './commons/background';
import LoginComponent from './commons/Login';
import PrivateComponent from './commons/logged_component';

import Navbar from './commons/navbar';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div className="container" style={{paddingTop: '70px'}}>
                    <Switch>
                        <Route exact path="/" component={RecipeIndex}/>
                        <Route exact path="/login" component={LoginComponent}/>
                        <Route path="/recipes" component={RecipeRouter}/>
                    </Switch>

                    <PrivateComponent component={LoginComponent}/>
                </div>

                <Background/>
            </div>
        );
    }

    componentWillMount(){
        const user = this.props.data.user;
        console.log(user);
        if (!!user){
            console.log(localStorage.getItem(GC_USER_ID), user.id, user.id == localStorage.getItem(GC_USER_ID));
        }

        if (!!localStorage.getItem(GC_AUTH_TOKEN) && !!user && !!user.id && user.id == localStorage.getItem(GC_USER_ID)){
            console.log('Login user');
            this.props.login(user.id, localStorage.getItem(GC_AUTH_TOKEN));
        }else {
            console.log('Logout user APP');
            //this.props.logout();
        }
    }
}

const mapStateToProps = ({sessionReducer}) => ({
    auth: sessionReducer.auth
});

const mapDispatchToProps = (dispatch) => ({
    login: (userId, token) => { dispatch(FullLogin(userId, token)) },
    logout: () => { dispatch(Logout()) }
});

const IS_USER_LOGGED = gql`
    query {
        user {
            id
        }
    }
`;

const component = graphql(IS_USER_LOGGED)(App);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(component));