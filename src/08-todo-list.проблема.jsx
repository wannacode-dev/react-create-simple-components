import React from 'react';
 
import './style.css';

const { useState } = React;

function TodoList() {
    // Создайте состояние todos - массив с начальными задачами
    // Каждая задача: { id: number, text: string, completed: boolean }
    
    // Создайте состояние inputValue для поля ввода (начальное значение: '')
    const [inputValue, setInputValue] = useState('')
    const [todos, setTodos] = useState([])
    
    const addTodo = () => {
        // Проверьте, что inputValue не пустой
        // Создайте новую задачу с уникальным id (используйте Date.now())
        // Добавьте её в массив todos
        // Очистите inputValue
        if(inputValue.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        }

        setTodos([...todos, newTodo]);
        setInputValue('')
    };
    
    const toggleTodo = (id) => {
        // Измените completed для задачи с данным id
        // Используйте map для создания нового массива
        setTodos(
            todos.map(todo => todo.id === id ? {
                ...todo,
                completed: !todo.completed
            } : todo)
        )
    };
    
    const deleteTodo = (id) => {
        // Удалите задачу с данным id из массива
        // Используйте filter
        setTodos(todos.filter(todo => todo.id !== id))
    };

    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length
    
    return (
        <div className="todo-container">
            <h1>✅ Мой TODO List</h1>
            
            {/* Форма добавления */}
            <div className="todo-form">
                <input 
                    type="text"
                    value={inputValue} // inputValue
                    onChange={
                        (e) => setInputValue(e.target.value)
                    } // setInputValue
                    placeholder="Что нужно сделать?"
                    className="todo-input"
                />
                <button
                    onClick={addTodo}
                    className="add-button"
                >
                    Добавить
                </button>
            </div>
            
            {/* Список задач - используйте map для отображения всех todos */}
            <ul className="todo-list">
                {/* Для каждой задачи создайте li с классом "todo-item" */}
                {/* Добавьте чекбокс, текст задачи и кнопку удаления */}
                {
                    todos.map(todo => (
                        <li
                            key={todo.id}
                            className='todo-item'
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                className='todo-checkbox'
                                onChange={
                                    () => toggleTodo(todo.id)
                                }
                            />
                            <span className={`todo-text ${todo.completed && 'completed'}`}>{ todo.text}</span>
                            <button
                                onClick={
                                    () => deleteTodo(todo.id)
                                }
                                className='delete-button'
                            >
                                Удалить
                            </button>
                        </li>
                    ))
                }
            </ul>

            {totalCount > 0 && <div className="todo-stats">
                {/* Показать статистику сколько задачей выполнено*/}
                {/*Сколько задач осталось выполнить */}
                <div>
                    Выполнено: <strong>{completedCount}</strong> из 
                    <strong>{totalCount}</strong>
                </div>
                <div>
                    Осталось: <strong>{totalCount - completedCount}</strong>
                </div>
            </div>}
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

