import React from 'react';
import { actions } from './data.json';

const Menu = (props) => {

  const {
    onChangeMenu,
    bookId,
    active
  } = props;

  return (
    <div className="book-shelf-changer">
      <select onChange={(e) => onChangeMenu(bookId, e.target.value)} value={active} >
        {actions.map(action => (
          <option key={action.id} value={action.value} >{action.title}</option>
        ))}
      </select>
    </div>
  );
};

export default Menu;