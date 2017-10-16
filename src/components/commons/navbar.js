import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';

class Navbar extends Component {
    state = {
        userId: localStorage.getItem(GC_USER_ID)
    };

    renderCreateRecipeLink (){
        if (this.state.userId){
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
        if (this.state.userId){
            return (
                <li>
                    <a href="/" onClick={(event) => {
                        event.preventDefault();
                        localStorage.removeItem(GC_USER_ID);
                        localStorage.removeItem(GC_AUTH_TOKEN);
                        this.props.history.push('/');
                    }}>
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
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
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
}

export default withRouter(Navbar);