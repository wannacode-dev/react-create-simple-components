import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const { useState, useEffect, useRef } = React;

// Начальные сообщения
const INITIAL_MESSAGES = [
    { id: 1, text: 'Привет! Как дела?', sender: 'bot', time: '10:00' },
    { id: 2, text: 'Отлично! А у тебя?', sender: 'user', time: '10:01' },
    { id: 3, text: 'Тоже хорошо! Что нового?', sender: 'bot', time: '10:02' },
];

function ChatInterface() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    
    // Автоскролл при добавлении новых сообщений
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const sendMessage = (e) => {
        e.preventDefault();
        
        if (inputValue.trim() === '') return;
        
        // Добавляем сообщение пользователя
        const newMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages([...messages, newMessage]);
        setInputValue('');
        
        // Имитация ответа бота через 1-2 секунды
        setIsTyping(true);
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
            
            const botMessage = {
                id: Date.now() + 1,
                text: randomResponse,
                sender: 'bot',
                time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
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
                {messages.length === 0 ? (
                    <div className="empty-chat">
                        <div className="icon">💬</div>
                        <p>Начните общение</p>
                    </div>
                ) : (
                    messages.map(message => (
                        <div 
                            key={message.id} 
                            className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
                        >
                            <div className="message-avatar">
                                {message.sender === 'user' ? '👤' : '🤖'}
                            </div>
                            <div className="message-content">
                                <p className="message-text">{message.text}</p>
                                <div className="message-time">{message.time}</div>
                            </div>
                        </div>
                    ))
                )}
                
                {/* Индикатор печатания */}
                {isTyping && (
                    <div className="message received">
                        <div className="message-avatar">🤖</div>
                        <div className="typing-indicator">
                            <div className="typing-dots">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                            <span>печатает...</span>
                        </div>
                    </div>
                )}
                
                {/* Элемент для автоскролла */}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Форма отправки */}
            <form onSubmit={sendMessage} className="chat-input-form">
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="chat-input"
                />
                <button 
                    type="submit"
                    disabled={inputValue.trim() === ''}
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

