import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const { useState } = React;

// Создайте компонент ProfileCard, который принимает props:
// - avatar (эмодзи аватарки)
// - name (имя)
// - bio (краткое описание)
// - followers (количество подписчиков)
// - following (количество подписок)

function ProfileCard() {
    return (
        <div className="profile-card">
            {/* Аватар - используйте className="profile-avatar" */}
            <div 
                className="profile-avatar"
                role="img"
                aria-label="Profile avatar"
            >
                {/* Используйте prop avatar (эмодзи) */}
            </div>
            
            {/* Информация */}
            <div className="profile-info">
                <h2 className="profile-name">
                    {/* Имя из props */}
                </h2>
                
                <p className="profile-bio">
                    {/* Bio из props */}
                </p>
                
                {/* Статистика */}
                <div className="profile-stats">
                    <div className="stat-item">
                        <div className="stat-value">
                            {/* followers */}
                        </div>
                        <div className="stat-label">
                            Подписчики
                        </div>
                    </div>
                    
                    <div className="stat-item">
                        <div className="stat-value">
                            {/* following */}
                        </div>
                        <div className="stat-label">
                            Подписки
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <h1 className="page-title">
                👥 Наша команда
            </h1>
            
            <div className="cards-container">
                {/* Создайте 3 карточки с разными данными */}
                {/* Например:
                    - avatar: "https://i.pravatar.cc/300?img=1"
                    - name: "Анна Иванова"
                    - bio: "Frontend разработчик | React энтузиаст"
                    - followers: 1234
                    - following: 567
                */}
            </div>
        </div>
    );
}

export default App;
