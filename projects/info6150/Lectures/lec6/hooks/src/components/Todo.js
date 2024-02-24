import React, { useReducer, useState } from 'react';

/* Initial state for itemList */
const initialItemListState = {
  itemList: []
};

/* Reducer function  */
const itemListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        itemList: [...state.itemList, action.payload]
      };
    default:
      return state;
  }
};

const Todo = () => {
  const [itemListState, dispatch] = useReducer(itemListReducer, initialItemListState);
  const [currentItem, setCurrentItem] = useState({ id: null, name: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currentItem.name.trim()) 
        return;
    
    const newItem = {
      ...currentItem,
      id: Date.now()
    };

    dispatch({type: 'ADD_ITEM',payload: newItem});


    setCurrentItem({ id: null, name: '' });
  };



  const handleInputChange = (event) => {
    setCurrentItem({ ...currentItem, name: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentItem.name}
          onChange={handleInputChange}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {itemListState.itemList.map(item => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
