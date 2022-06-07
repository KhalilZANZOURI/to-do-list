import './App.css';
import { useState, useEffect } from 'react';
import Item from './components/item';
import SearchBar from './components/SearchBar';

import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [task, setTask] = useState([]);

  const [isUpdating, setUpdating] = useState('');


  const getLists = async () => {
    axios.get('http://localhost:5000/lists').then(res => {
      setList(res.data);
    });
  };

  const getTasks = async (_id) => {
    axios.get(`http://localhost:5000/lists/${_id}/tasks`).then(res => {
      setTask(res.data);

    });
  };


  useEffect(() => {
    getLists();
    getTasks();
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
        <SearchBar/>

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
          {list.map(item => (
            <Item
              key={item._id}
              text={item.name}
              remove={() => deleteList(item._id)}
              update={() => getTasks(item._id)}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;