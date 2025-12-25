import React from 'react';
 
import './style.css';

const { useState } = React;

function Tabs() {
    const [activeTab, setActiveTab] = useState('profile');
    
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
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            
            {/* Контент табов */}
            <div className="tabs-content">
                {activeTab === 'profile' && (
                    <div>
                        <h2>👤 Профиль пользователя</h2>
                        <p><strong>Имя:</strong> Иван Иванов</p>
                        <p><strong>Email:</strong> ivan@example.com</p>
                        <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
                        <p><strong>Регистрация:</strong> 15 марта 2024</p>
                        <p><strong>Статус:</strong> <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Активен</span></p>
                    </div>
                )}
                
                {activeTab === 'posts' && (
                    <div>
                        <h2>📝 Мои посты</h2>
                        <div className="posts-list">
                            <div className="post-item">
                                <h4>Первый пост о React</h4>
                                <div className="post-meta">
                                    <span>❤️ 42 лайков</span>
                                    <span>📅 20.10.2024</span>
                                </div>
                            </div>
                            <div className="post-item">
                                <h4>Как работает useState</h4>
                                <div className="post-meta">
                                    <span>❤️ 156 лайков</span>
                                    <span>📅 18.10.2024</span>
                                </div>
                            </div>
                            <div className="post-item">
                                <h4>Советы по JSX</h4>
                                <div className="post-meta">
                                    <span>❤️ 89 лайков</span>
                                    <span>📅 15.10.2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {activeTab === 'settings' && (
                    <div>
                        <h2>⚙️ Настройки</h2>
                        <div className="settings-section">
                            <h4>Уведомления</h4>
                            <label>
                                <input type="checkbox" defaultChecked />
                                Получать email уведомления
                            </label>
                            <label>
                                <input type="checkbox" defaultChecked />
                                Push уведомления в браузере
                            </label>
                        </div>
                        
                        <div className="settings-section">
                            <h4>Приватность</h4>
                            <label>
                                <input type="checkbox" />
                                Приватный профиль
                            </label>
                            <label>
                                <input type="checkbox" defaultChecked />
                                Показывать активность
                            </label>
                        </div>
                        
                        <button className="save-button">
                            Сохранить настройки
                        </button>
                    </div>
                )}
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
