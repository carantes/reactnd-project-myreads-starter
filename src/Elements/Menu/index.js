import React from 'react';
import { string, func } from 'prop-types';
import { actions } from './data.json';

const Menu = (props) => {
    const {
        onChangeMenu,
        bookId,
        active,
    } = props;

    return (
        <div className="book-shelf-changer">
            <select onChange={e => onChangeMenu(bookId, e.target.value)} value={active} >
                {actions.map(action => (
                    <option key={action.id} value={action.value} >{action.title}</option>
                ))}
            </select>
        </div>
    );
};

Menu.defaultProps = {
    active: '',
};

Menu.propTypes = {
    bookId: string.isRequired,
    active: string,
    onChangeMenu: func.isRequired,
};

export default Menu;
