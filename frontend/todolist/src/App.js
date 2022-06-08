import './App.css';
import { useState, useEffect } from 'react';
import Item from './components/item';
import SearchBar from './components/SearchBar';

import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState(false);
  const [isUpdating, setIsUpdating] = useState();

  const getLists = async () => {
    axios.get('http://localhost:5000/lists').then(res => {
      setList(res.data);
    });
  };

  // const getTasks = async _id => {
  //   axios.get(`http://localhost:5000/lists/${_id}/tasks`).then(res => {
  //     setTask(res.data);
  //   });
  // };

  useEffect(() => {
    getLists();
  }, []);

  const addList = () => {
    axios.post('http://localhost:5000/lists', { name: text }).then(res => {
      console.log(res.data);
      getLists();
    });
  };

  const updateList = (_id, text) => {
    if (isUpdating === '') {
      axios
        .put(`http://localhost:5000/lists/${_id}`, { text })
        .then(res => {
          console.log(res.data);
          setText('');
          getLists();
        })
        .catch(err => console.log(err));
    }
  };

  const deleteList = _id => {
    axios.delete(`http://localhost:5000/lists/${_id}`).then(res => {
      console.log(res);
      getLists();
    });
  };

  return (
    <div className='App'>
      <div className='container'>
        <h1>My lists</h1>
        <SearchBar setCurrentList={setCurrentList} list={list} />
        <div className='top'>
          <input
            type='text'
            placeholder='Type list name '
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <div className='add' onClick={addList}>
            Add List
          </div>
        </div>

        <div className='list'>
          {/* {list.map(item => (
            <Item
              id={item._id}
              key={item._id}
              text={item.name}
              remove={() => deleteList(item._id)}
              // update={() => getTasks(item._id)}
            />
          ))} */}
          {currentList && (
            <Item
              id={currentList._id}
              key={currentList._id}
              text={currentList.name}
              remove={() => deleteList(currentList._id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
