import './App.css';
import { useState, useEffect } from "react";
import Item from './components/item';

import axios from 'axios';

function App() {

  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");


  useEffect(() => {
    const get = async () => { axios.get("http://localhost:5000/lists")
    .then((res) => {
      setTodo(res.data)
      console.log(res)
    })
    .catch((err) => console.log(err))}

    get();
    console.log(todo);

  }, [])

  const addUpdate = () => {
    if (isUpdating === "") {
      axios.post("http://localhost:5000/lists", { text })
        .then((res) => {
          console.log(res.data);
          setText("");
        })

        .catch((err) => console.log(err));
    }
  }

  const deleteToDo = (_id) => {

  }
  const updateToDo = (_id, text) => {

  }



  return (

    <div className='App'>
      <div className='container'>
        <h1>To Do List</h1>

        <div className='top'>
          <input type="text"
            placeholder='write something...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className='add' onClick={addUpdate}>Add</div>
        </div>

        <div className='list'>
          {todo.map(item =>

            <Item
              key={item._id} text={item.text}
              remove={() => deleteToDo(item._id)}
              update={() => updateToDo(item._id, item.text)}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
