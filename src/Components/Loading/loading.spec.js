import React from 'react';
import {
    shallow,
} from 'enzyme';
import Loading from './index';

describe('Loading component', () => {
    it('should render without crash', () => {
        expect(shallow(
            <Loading />,
        )).toMatchSnapshot();
    });
});
