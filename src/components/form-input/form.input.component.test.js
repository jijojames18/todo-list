import React from 'react';
import {shallow} from 'enzyme';

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import FormInput from './form-input.component';

describe('Form Input component', () => {
    it('should call handleChange method when input changes', () => {
        const handleChange = jest.fn();
        const mockProps = {
            'type': 'text',
            'name': "test",
            "value": "test",
            'handleChange': handleChange
        };
        const wrapper = shallow(<FormInput {...mockProps} />);
        wrapper.find('.form-input').simulate('change');
        expect(handleChange).toHaveBeenCalled();
    });
});