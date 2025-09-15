import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Todo.css';

function TodoApp() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null); // New state to track the item being edited
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jwttoken = Cookies.get('jwttoken');

  const fetchTodos = async () => {
    try {
      if (!jwttoken) {
        navigate('/login');
        return;
      }
      const response = await axios.get('https://back-todo-6.onrender.com/todos', {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      });
      setTodos(response.data.result);
      setLoading(false);
      setError("")
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setLoading(false);
      setError('Failed to load tasks. Please log in again.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  // New function to handle the form submission for both adding and updating
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)
    if (inputValue.trim() === '') return ;

    try {
      if (editingId) {
        // If there's an editingId, it means we are updating an item
        const response = await axios.put(
          `https://back-todo-6.onrender.com/todos/${editingId}`,
          { text: inputValue },
          {
            headers: { Authorization: `Bearer ${jwttoken}` },
          }
        );
        // Update the item in the local state with the new data from the server
        setTodos(
          todos.map((todo) =>
            todo._id === editingId ? response.data.result : todo
          )
        );
        setError("")
        setEditingId(null); 
      } else {
        const response = await axios.post(
          'https://back-todo-6.onrender.com/todos',
          { text: inputValue },
          {
            headers: { Authorization: `Bearer ${jwttoken}` },
          }
        );
        setTodos([...todos, response.data.result]);
      }
      setInputValue(''); // Clear the input field
      setError(null);
    } catch (err) {
      console.error('Failed to save todo:', err);
      setError(`Failed to ${editingId ? 'update' : 'add'} task.`);
    }
  };


  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://back-todo-6.onrender.com/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      });
      setTodos(todos.filter(todo => todo._id !== id));
      setError("")
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Failed to delete task.');
    }
  };
  
  // New function to handle when the update button is clicked
  const handleEditClick = (todo) => {
    setInputValue(todo.text);
    setEditingId(todo._id);
  };
  
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.put(
        `https://back-todo-6.onrender.com/todos/${id}`, 
        { completed: !currentStatus },
        {
          headers: { Authorization: `Bearer ${jwttoken}` },
        }
      );
      setTodos(
        todos.map(todo =>
          todo._id === id ? response.data.result : todo
        )
      );
      setError("")
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update task.');
    }
  };


  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>
      <form className="todo-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add or update a task..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>
      {error && <p className="error-message" style={{color:"red"}}>{error}</p>}
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo._id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <span
              className="todo-text"
              onClick={() => handleToggleComplete(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <div className="btn-group">
                <button
                    onClick={() => handleEditClick(todo)}
                    className="edit-btn"
                >
                    Update
                </button>
                <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="delete-btn"
                >
                    Delete
                </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="logout-btn" onClick={() => {
        Cookies.remove('jwttoken');
        navigate('/login');
      }}>
        Logout
      </button>
    </div>
  );
}

export default TodoApp;