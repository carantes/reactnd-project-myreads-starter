import React from 'react';
import actions from './Actions.json';

const Menu = (props) => {

  const {
    onChangeMenu,
    bookShelfId,
    bookId
  } = props;

  return (
    <div className="book-shelf-changer">
      <select onChange={(e) => onChangeMenu(bookId, bookShelfId, e.target.value) }>
        {actions.map(action => (
          <option key={action.id} value={action.value} >{action.title}</option>
        ))}
      </select>
    </div>
  );
};

export default Menu;