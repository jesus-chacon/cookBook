import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FullLogin, Logout } from '../../actions/session';
import { GC_AUTH_TOKEN, GC_USER_ID } from "../constants";

class AutoLogin extends Component {
    render(){
        return this.props.children;
    }

    componentWillMount(){
        const user = this.props.user;

        if (!!localStorage.getItem(GC_AUTH_TOKEN) && !!user && !!user.id && user.id == localStorage.getItem(GC_USER_ID)){
            this.props.login(user.id, localStorage.getItem(GC_AUTH_TOKEN));
        }else {
            this.props.logout();
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (userId, token) => { dispatch(FullLogin(userId, token)) },
    logout: () => { dispatch(Logout()) }
});

export default connect((state) => ({state}), mapDispatchToProps)(AutoLogin);
