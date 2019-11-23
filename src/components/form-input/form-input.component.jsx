import React from 'react';

import './form-input.styles.scss';

const FormInput = ({handleChange, type, name, value}) => {
    return (
        <input className="form-input" name={name} type={type} onChange={handleChange} value={value} required/>
    );
};

export default FormInput;