import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import { FullLogin, Logout } from '../../actions/session';
import { GC_AUTH_TOKEN, GC_USER_ID } from "../constants";

class AutoLogin extends Component {
    render(){

    }

    _login(){
        const user = this.props.data.user;

        if (!!localStorage.getItem(GC_AUTH_TOKEN) && !!user && !!user.id && user.id == localStorage.getItem(GC_USER_ID)){
            console.log('Login user');
            //this.props.login(user.id, localStorage.getItem(GC_AUTH_TOKEN));
        }else {
            console.log('Logout user');
            //this.props.logout();
        }
    }

    _logout() {

    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (userId, token) => { dispatch(FullLogin(userId, token)) },
    logout: () => {Logout()}
});

const IS_USER_LOGGED = gql`
    query {
        user {
            id
        }
    }
`;

const component = graphql(IS_USER_LOGGED)(AutoLogin);

export default connect((state) => ({state}), mapDispatchToProps)(component);
