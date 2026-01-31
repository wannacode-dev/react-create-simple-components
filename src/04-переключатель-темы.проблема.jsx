import React from 'react';
 
import './style.css';

const { useState } = React;

function ThemeSwitcher() {
    // Создайте состояние theme со значением 'light' или 'dark'
    // Начальное значение: 'light'
    
    const toggleTheme = () => {
        // Переключайте между 'light' и 'dark'
    };
    
    return (
        <div className={`theme-container`}>
            {/* Добавьте класс 'light' или 'dark' в зависимости от theme */}
            
            <h1>
                {/* Покажите эмодзи: ☀️ для light, 🌙 для dark */}
                Переключатель темы
            </h1>
            
            <p>
                Текущая тема: <strong>{/* покажите текущую тему: светлая/тёмная */}</strong>
            </p>
            
            <button
                onClick={toggleTheme}
                className={`theme-toggle-button`}
                // Добавьте класс theme
            >
                {/* Покажите соответствующую иконку:☀️ для light, 🌙 для dark */}
                ☀️
            </button>
            
            {/* Добавьте класс theme */}
            <div className="demo-content">
                <h3>✨ Демо контент</h3>
                <p>
                    Этот текст меняет цвет в зависимости от темы.
                    Попробуйте переключить тему и посмотрите, как изменится весь интерфейс!
                </p>
            </div>
        </div>
    );
}

function App() {
    return <ThemeSwitcher />;
}

export default App;
