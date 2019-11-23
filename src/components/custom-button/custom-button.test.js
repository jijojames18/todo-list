import React from 'react';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import CustomButton from './custom-button.component';

describe('Custom Button component', () => {
    let mockHandleClick;
    let mockProps;
    beforeEach(() => {
        mockHandleClick = jest.fn();
    });

    it('should match snapshot', () => {
        expect(shallow(<CustomButton/>)).toMatchSnapshot();
    });
});