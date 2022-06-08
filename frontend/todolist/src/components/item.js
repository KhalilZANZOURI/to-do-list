import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Item({ id, text, remove, update }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const getTasks = async () => {
    axios
      .get(`http://localhost:5000/lists/${id}/tasks`)
      .then(res => setTasks(res.data));
  };
  const addTask = async () => {
    axios
      .post(`http://localhost:5000/lists/${id}/tasks`, {
        name: input,
        done: false,
      })
      .then(res => console.log('added Task successfully'))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='item'>
        <div className='text'>{text}</div>
        <div className='icons'>
          <i className='ri-edit-line' onClick={update}></i>
          <i className='ri-chat-delete-line' onClick={remove}></i>
        </div>
      </div>
      <div className='taskContainer'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <input
            style={{ width: '200px', height: '25px' }}
            placeholder='Add a new Task'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className='add' onClick={() => addTask()}>
            Add Task
          </div>
        </div>

        {tasks.map(task => (
          <p key={task._id}>{task.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Item;
