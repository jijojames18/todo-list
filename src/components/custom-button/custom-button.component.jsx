import React from 'react';

import "./custom-button.styles.scss";

const CustomButton = ({children, otherProps}) => (
    <button className="add-button" {...otherProps}>
        {
            children
        }
    </button>
);

export default CustomButton;