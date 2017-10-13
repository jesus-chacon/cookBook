import React, { Component } from 'react';

import { connect } from 'react-redux';

class Background extends Component {
    render() {
        if (!!this.props.background && this.props.background.length > 0) {
            return (
                <img id="bg" src={this.props.background} alt="background image" />
            );
        }else {
            return (
                <div id="bg"></div>
            );
        }
    }
}

const mapStateToProps = ({backgroundReducer}) => ({
    background: backgroundReducer.background
});

export default connect(mapStateToProps)(Background);