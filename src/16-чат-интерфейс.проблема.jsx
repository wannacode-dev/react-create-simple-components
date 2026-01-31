import React from 'react';
 
import './style.css';

const { useState, useEffect, useRef } = React;

// Начальные сообщения
const INITIAL_MESSAGES = [
    { id: 1, text: 'Привет! Как дела?', sender: 'bot', time: '10:00' },
    { id: 2, text: 'Отлично! А у тебя?', sender: 'user', time: '10:01' },
    { id: 3, text: 'Тоже хорошо! Что нового?', sender: 'bot', time: '10:02' },
];

function ChatInterface() {
    // Создайте состояния:
    // - messages (массив сообщений, начальное: INITIAL_MESSAGES)
    // - inputValue (текст в поле ввода, начальное: '')
    // - isTyping (печатает ли бот, начальное: false)
    
    const messagesEndRef = useRef(null);
    
    // Автоскролл при изменении messages (useEffect -> scrollToBottom)
    
    const scrollToBottom = () => {
        // Прокрутите к messagesEndRef (scrollIntoView)
    };
    
    const sendMessage = (e) => {
        e.preventDefault();
        
        // Проверьте, что inputValue не пустой
        
        // Создайте новое сообщение: id, text: inputValue, sender: 'user', time
        // Добавьте в messages, очистите inputValue
        
        // Опционально: имитация ответа бота (setIsTyping(true), setTimeout 1–2 сек, добавить сообщение бота, setIsTyping(false))
        setTimeout(() => {
            const botResponses = [
                'Интересно! Расскажи подробнее',
                'Понятно, спасибо за информацию',
                'Согласен с тобой!',
                'Это действительно интересно',
                'Я тоже так думаю',
                'Отличная мысль!',
                'Спасибо, что поделился',
            ];
            
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

        }, 1500);
    };
    
    return (
        <div className="chat-container">
            {/* Заголовок */}
            <div className="chat-header">
                <div className="chat-avatar">🤖</div>
                <div className="chat-info">
                    <h2>Чат-бот Помощник</h2>
                    <p>Всегда на связи</p>
                </div>
            </div>
            
            {/* Сообщения */}
            <div className="chat-messages">
                {/* Отобразите все messages */}
                {/* Для каждого: класс "message sent" для user, "message received" для bot */}
                {/* Покажите аватар, текст и время 👤 🤖 */}
                
                {/* Индикатор печатания, если isTyping === true */}
                
                {/* Элемент для автоскролла */}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Форма отправки */}
            <form onSubmit={sendMessage} className="chat-input-form">
                <input 
                    type="text"
                    value={''} // inputValue
                    onChange={() => {}} // setInputValue
                    placeholder="Введите сообщение..."
                    className="chat-input"
                />
                <button 
                    type="submit"
                    disabled={false} // заблокируйте если inputValue пустой
                    className="send-button"
                >
                    ➤
                </button>
            </form>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <ChatInterface />
        </div>
    );
}

export default App;
