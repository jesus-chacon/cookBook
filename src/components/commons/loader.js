import React, { Component } from 'react';
import { RotateLoader } from 'react-spinners';

class loader extends Component {
    color = '#e91e63';

    render() {
        return (
            <div className="loader-component text-center" style={this.props.style}>
                <RotateLoader color={this.color}/>
            </div>
        );
    }
}

export default loader;