import React, { Component } from 'react';
import { connect } from 'react-redux';
import {graphql, gql, compose} from 'react-apollo';

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import { ChangeBackground } from "../../actions/background";
import { FullLogin } from '../../actions/session';

class Login extends Component {
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        name: ''
    };

    renderBlockIcon(){
        if (this.state.login){
            return (
                <div className="text-center">
                    <i className="fa fa-5x fa-user-circle-o"/>
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <i className="fa fa-5x fa-user-plus"/>
                </div>
            );
        }
    };

    componentDidMount(){
        this.props.changeBackground('');
    }

    render() {
        return (
            <div className="row center-xs">
                <div className="col-xs-12 col-sm-8 text-left login-block">
                    <h1>{this.state.login ? 'Login' : 'Sign Up'}</h1>

                    {this.renderBlockIcon()}

                    {
                        !this.state.login &&
                        <div className="form-group">
                            <label>Name</label>
                            <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} type='text'
                                   className="form-control" placeholder='Your name'/>
                        </div>
                    }

                    <div className="form-group">
                        <label>Email</label>
                        <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type='text'
                               className="form-control" placeholder='Your email address'/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type='password'
                               className="form-control" placeholder='Choose a safe password'/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-success" onClick={() => this._confirm()}>
                            {this.state.login ? 'login' : 'create account' }
                        </button>
                    </div>

                    <div className="form-group">
                        <button className="btn" onClick={() => this.setState({ login: !this.state.login })}>
                            {this.state.login ? 'need to create an account?' : 'already have an account?'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async () => {
        const { name, email, password } = this.state;
        if (this.state.login) {
            const result = await this.props.signinUserMutation({
                variables: {
                    email,
                    password
                }
            });
            const id = result.data.signinUser.user.id;
            const token = result.data.signinUser.token;
            this.props.setAuthInfo(id, token);
        } else {
            const result = await this.props.createUserMutation({
                variables: {
                    name,
                    email,
                    password
                }
            });
            const id = result.data.signinUser.user.id;
            const token = result.data.signinUser.token;
            this.props.setAuthInfo(id, token);
        }
        this.props.history.push(`/`)
    };
}

const mapDispatchToProps = (dispatch) => ({
    changeBackground: (background) => { dispatch(ChangeBackground(background))},
    setAuthInfo: (userId, authToken) => { dispatch(FullLogin(userId, authToken)) }
});

const CREATE_USER = gql`
    mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, authProvider:{email: {email: $email, password: $password}}){
            id
        }
        
        signinUser(email: {
            email: $email,
            password:$password
        }){
            token
            user {
                id
            }
        }
    }
`;

const SIGNIN_USER = gql`
    mutation SigninUserMutation($email: String!, $password: String!){
        signinUser(email: {
            email: $email,
            password:$password
        }){
            token
            user {
                id
            }
        }
    }
`;

const component = compose(
    graphql(CREATE_USER, {name: 'createUserMutation'}),
    graphql(SIGNIN_USER, {name: 'signinUserMutation'})
)(Login);

export default connect((state)=>({state}), mapDispatchToProps)(component);