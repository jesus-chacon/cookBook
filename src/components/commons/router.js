import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

export const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => renderMergedProps(component, routeProps, rest)}/>
    );
};

export const PrivateRoute = ({ component, redirectTo, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return auth.loggedIn() ? (
                renderMergedProps(component, routeProps, rest)
            ) : (
                <Redirect to={{
                    pathname: redirectTo,
                    state: { from: routeProps.location }
                }}/>
            );
        }}/>
    );
};
