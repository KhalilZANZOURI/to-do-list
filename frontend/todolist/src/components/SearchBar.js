import React from 'react';
import './SearchBar.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ list, setCurrentList }) {
  const [lists, setLists] = useState([]);
  const getLists = async () => {
    axios.get('http://localhost:5000/lists').then(res => setLists(res.data));
  };
  useEffect(() => {
    getLists();
  }, [list]);

  // const [list, setList] = useState('');
  return (
    <div className='container'>
      <select
        className='select'
        onChange={e => {
          setCurrentList(JSON.parse(e.target.value));
        }}
      >
        {lists.map(list => (
          <option key={list._id} value={JSON.stringify(list)}>
            {list.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;
