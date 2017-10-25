import React from 'react';
import {
    shallow,
    mount,
} from 'enzyme';
import Menu from './index';

describe('Menu component', () => {
    const defaultProps = {
        bookId: '1',
        active: '',
        onChangeMenu: jest.fn(),
    };

    it('should render without crash', () => {
        expect(shallow(
            <Menu
                {...defaultProps}
            />,
        )).toMatchSnapshot();
    });

    it('should select a item in menu if book is in any shelf', () => {
        const props = {
            ...defaultProps,
            active: 'currentlyReading',
        };

        const menu = shallow(<Menu {...props} />);

        expect(menu.find('select').prop('value')).toEqual('currentlyReading');
    });

    it('should call onChangeMenu prop when select shelf on Menu', () => {
        const props = {
            ...defaultProps,
        };

        const menu = mount(<Menu {...props} />);

        const eventMock = { target: { } };
        menu.find('select').props().onChange(eventMock);

        expect(props.onChangeMenu).toHaveBeenCalled();
    });
});
