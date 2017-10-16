import React from 'react';
import { GC_USER_ID } from "../constants";

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

export const PrivateComponent = ({ component , ...rest }) => {
    const isLogued =
    return (
        <div></div>
    );
};
