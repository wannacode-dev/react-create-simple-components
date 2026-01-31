import React from 'react';

import './style.css';

const { useState } = React;

function Tabs() {
    // Создайте состояние activeTab со значением 'profile', 'posts' или 'settings'
    // Начальное значение: 'profile'

    const tabs = [
        { id: 'profile', label: '👤 Профиль' },
        { id: 'posts', label: '📝 Посты' },
        { id: 'settings', label: '⚙️ Настройки' }
    ];

    return (
        <div className="tabs-container">
            <h1>Навигация по табам</h1>

            {/* Кнопки табов */}
            <div className="tabs-buttons">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            // Установите activeTab в tab.id
                        }}
                        className={`tab-button`}
                    // Добавьте класс 'active' если activeTab === tab.id
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Контент табов - используйте условный рендеринг по activeTab */}
            <div className="tabs-content">
                {/* Если activeTab === 'profile' - покажите блок с профилем (Имя, Email, Регистрация) */}
                <div>
                    <h2>👤 Профиль пользователя</h2>
                    <p><strong>Имя:</strong> Иван Иванов</p>
                    <p><strong>Email:</strong> ivan@example.com</p>
                    <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
                    <p><strong>Регистрация:</strong> 15 марта 2024</p>
                    <p><strong>Статус:</strong> <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Активен</span></p>
                </div>
                {/* Если activeTab === 'posts' - покажите блок "Мои посты" с posts-list */}
                {/* Если activeTab === 'settings' - покажите блок "Настройки" */}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <Tabs />
        </div>
    );
}

export default App;
