import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Item({ id, text, remove, getLists }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateValue, setUpdateValue] = useState(text);
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
      .then(res => getTasks())
      .catch(err => console.log(err));
  };
  const removeTask = async taskId => {
    axios
      .delete(`http://localhost:5000/lists/${id}/tasks/${taskId}`)
      .then(res => getTasks());
  };
  const toggleDone = async (taskId, done) => {
    axios
      .put(`http://localhost:5000/lists/${id}/tasks/${taskId}`, {
        done: !done,
      })
      .then(res => getTasks());
  };
  const updateList = () => {
    axios
      .put(`http://localhost:5000/lists/${id}`, {
        name: updateValue,
      })
      .then(res => {
        getLists();
        setIsUpdating(false);
      });
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
        {isUpdating ? (
          <input
            value={updateValue}
            onChange={e => {
              setUpdateValue(e.target.value);
            }}
            style={{
              height: 30,
              width: '50%',
              fontSize: 'large',
            }}
          />
        ) : (
          <h3>{text}</h3>
        )}
        <div className='icons'>
          {isUpdating ? (
            <>
              <i
                className='ri-close-circle-line'
                style={{ padding: 10 }}
                onClick={() => setIsUpdating(false)}
              ></i>
              <i className='ri-save-line' onClick={updateList}></i>
            </>
          ) : (
            <>
              <i
                className='ri-edit-line'
                onClick={() => setIsUpdating(true)}
              ></i>
              <i className='ri-chat-delete-line' onClick={remove}></i>
            </>
          )}
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
          <button type='submit' className='button' onClick={() => addTask()}>
            Add Task
          </button>
        </div>

        {tasks.map(task => (
          <div
            key={task._id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignContent: 'center',
                width: '100%',
              }}
            >
              <i
                className='ri-checkbox-line'
                style={{ marginRight: '10px' }}
                onClick={() => {
                  toggleDone(task._id, task.done);
                }}
              ></i>
              <p
                style={{
                  textDecoration: task.done ? 'line-through' : 'none',
                }}
              >
                {task.name}
              </p>
            </div>
            <i
              className='ri-chat-delete-line'
              onClick={() => removeTask(task._id)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Item;
