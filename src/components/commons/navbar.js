import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import { Logout } from '../../actions/session';

class Navbar extends Component {
    renderCreateRecipeLink (){
        if (this.props.auth.isLogged){
            return (
                <li>
                    <Link to="/recipes/create">Create</Link>
                </li>
            );
        }else {
            return;
        }
    };

    renderSessionBlock (){
        if (this.props.auth.isLogged){
            return (
                <li>
                    <a href="/" onClick={(event) => { event.preventDefault(); this._logout()}}>
                        Logout
                    </a>
                </li>
            );
        } else {
            return (
                <li>
                    <Link to="/login">Login</Link>
                </li>
            );
        }
    };

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <Link to="/" className="navbar-brand">CookBook</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="nav navbar-nav">
                            {this.renderCreateRecipeLink()}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <form className="navbar-form">
                                    <div className="form-group">
                                        <input type="text" className="form-control search-input" placeholder="Search" />
                                    </div>
                                </form>
                            </li>

                            {this.renderSessionBlock()}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    _logout() {
        this.props.logout();
        this.props.history.push('/');
    }
}

const mapStateToProps = ({sessionReducer}) => ({
    auth: sessionReducer.auth
});

const mapDispatchToProps = (dispatch) => ({
      logout: () => { dispatch(Logout()) }
});

const component = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default withRouter(component);