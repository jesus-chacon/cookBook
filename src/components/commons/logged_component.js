import React, { Component } from 'react';
import { connect } from 'react-redux';

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

class PrivateComponent extends Component {
    render() {
        const { component, ...rest} = this.props;

        if (this.props.auth.isLogged){
            return renderMergedProps(component, rest);
        } else {
            return (<div>No logged User</div>);
        }
    }
}

const mapStateToProps = ({sessionReducer}) => ({
    auth: sessionReducer.auth
});

export default connect(mapStateToProps)(PrivateComponent);
