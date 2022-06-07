import React from 'react'
import './SearchBar.css';

import { useState } from 'react'

function SearchBar() {
  const [list , setList] = useState("");
    return (
    <div className='container'>
      <select className='select' onChange={(e) => {
        const selectedItem = e.target.value;
        setList(selectedItem);
      }}>
      <option value="liste1">liste1</option>
      <option value="liste2">liste2</option>
      <option value="liste3">liste3</option>
      </select>
      {list}
    </div>
  )
}

export default SearchBar