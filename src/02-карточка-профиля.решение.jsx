import React from 'react';
 
import './style.css';

function ProfileCard({ avatar, name, bio, followers, following }) {
    return (
        <div className="profile-card">
            <div 
                className="profile-avatar"
                role="img"
                aria-label={`${name} avatar`}
            >
                {avatar}
            </div>
            
            <div className="profile-info">
                <h2 className="profile-name">
                    {name}
                </h2>
                
                <p className="profile-bio">
                    {bio}
                </p>
                
                <div className="profile-stats">
                    <div className="stat-item">
                        <div className="stat-value">
                            {followers.toLocaleString()}
                        </div>
                        <div className="stat-label">
                            Подписчики
                        </div>
                    </div>
                    
                    <div className="stat-item">
                        <div className="stat-value">
                            {following.toLocaleString()}
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
                <ProfileCard 
                    avatar="👩‍💻"
                    name="Анна Иванова"
                    bio="Frontend разработчик | React энтузиаст 💻"
                    followers={1234}
                    following={567}
                />
                
                <ProfileCard 
                    avatar="👨‍💻"
                    name="Иван Петров"
                    bio="UI/UX дизайнер | Люблю создавать красивые интерфейсы 🎨"
                    followers={2567}
                    following={432}
                />
                
                <ProfileCard 
                    avatar="👩‍🔧"
                    name="Мария Сидорова"
                    bio="Backend разработчик | Node.js эксперт 🚀"
                    followers={3421}
                    following={891}
                />
            </div>
        </div>
    );
}

export default App;
