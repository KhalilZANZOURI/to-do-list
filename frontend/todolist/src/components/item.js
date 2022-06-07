import React from 'react';

function Item({ text, remove, update }) {
  return (
    <div className='item'>
      <div className='text'>{text}</div>
      <div className='icons'>
        <i className='ri-edit-line' onClick={update}></i>
        <i className='ri-chat-delete-line' onClick={remove}></i>
      </div>
    </div>
  );
}

export default Item;