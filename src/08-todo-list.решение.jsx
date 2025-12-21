import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const { useState } = React;

function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Изучить React', completed: false },
        { id: 2, text: 'Сделать домашнее задание', completed: false },
        { id: 3, text: 'Написать код', completed: false }
    ]);
    const [inputValue, setInputValue] = useState('');
    
    const addTodo = () => {
        if (inputValue.trim() === '') return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        
        setTodos([...todos, newTodo]);
        setInputValue('');
    };
    
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    
    return (
        <div className="todo-container">
            <h1>✅ Мой TODO List</h1>
            
            {/* Форма добавления */}
            <div className="todo-form">
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Что нужно сделать?"
                    className="todo-input"
                />
                <button onClick={addTodo} className="add-button">
                    Добавить
                </button>
            </div>
            
            {/* Список задач */}
            {todos.length === 0 ? (
                <div className="empty-state">
                    <p>🎉</p>
                    <p>Все задачи выполнены!</p>
                    <p>Добавьте новую задачу выше</p>
                </div>
            ) : (
                <ul className="todo-list">
                    {todos.map(todo => (
                        <li key={todo.id} className="todo-item">
                            <input 
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="todo-checkbox"
                            />
                            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                {todo.text}
                            </span>
                            <button 
                                onClick={() => deleteTodo(todo.id)}
                                className="delete-button"
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            
            {/* Статистика */}
            {todos.length > 0 && (
                <div className="todo-stats">
                    <div>
                        Выполнено: <strong>{completedCount}</strong> из <strong>{totalCount}</strong>
                    </div>
                    <div>
                        Осталось: <strong>{totalCount - completedCount}</strong>
                    </div>
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <TodoList />
        </div>
    );
}

export default App;

