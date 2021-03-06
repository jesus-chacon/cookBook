import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { gql, graphql } from 'react-apollo';

import RecipeRouter from './recipes/router';
import Background from './commons/background';
import LoginComponent from './commons/login';
import Loader from './commons/loader';
import Navbar from './commons/navbar';
import AutoLogin from './commons/auto_login';

class App extends Component {
    state = {
        isLoading: true
    };

    render() {
        if (this.props.data.loading){
            return (<Loader style={{paddingTop: '15px'}}/>)
        } else if (this.props.data.error) {
            return (<div className="text-danger">Error loading the app</div>)
        } else {
            return (
                <AutoLogin user={this.props.data.user}>
                    <Navbar/>

                    <div className="container" style={{paddingTop: '70px'}}>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to='/recipes/new/1'/>}/>
                            <Route exact path="/login" component={LoginComponent}/>
                            <Route path="/recipes" component={RecipeRouter}/>
                        </Switch>
                    </div>

                    <Background/>
                </AutoLogin>
            );
        }
    }
}

const IS_USER_LOGGED = gql`
    query {
        user {
            id
        }
    }
`;

const component = graphql(IS_USER_LOGGED)(App);

export default withRouter(component);