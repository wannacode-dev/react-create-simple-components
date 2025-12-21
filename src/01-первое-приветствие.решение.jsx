import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const { useState } = React;

function WelcomeCard() {
    const name = "Макс";
    const role = "React разработчик";
    const emoji = "👋";
    
    return (
        <div className="welcome-card">
            <div className="emoji">
                {emoji}
            </div>
            
            <h1 className="title">
                Привет! Я {name}
            </h1>
            
            <p className="role">
                {role}
            </p>
            
            <p className="description">
                Добро пожаловать в мир React!
            </p>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <WelcomeCard />
        </div>
    );
}

export default App;
