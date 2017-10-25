import React from 'react';
import {
    shallow,
    mount,
} from 'enzyme';
import Library from './index';

jest.mock('../../Utils/api', () => ({
    getAll: () => ({
        then: success => success(
            [
                {
                    id: '1',
                    shelf: 'currentlyReading',
                },
                {
                    id: '2',
                    shelf: 'wantToRead',
                },
                {
                    id: '3',
                    shelf: 'read',
                },
            ],
        ),
    }),
    update: () => ({
        then: (success) => { success(); },
    }),
}), { virtual: true });

describe('Library Component', () => {
    const defaultProps = {

    };

    it('should render without crash', () => {
        expect(shallow(
            <Library
                {...defaultProps}
            />,
        )).toMatchSnapshot();
    });
});
