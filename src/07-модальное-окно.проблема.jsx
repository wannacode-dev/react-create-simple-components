import React from 'react';
 
import './style.css';

const { useState } = React;

function Modal({ isOpen, onClose }) {
    // Если модалка закрыта (isOpen === false), ничего не показываем
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* Клик по overlay (затемнённому фону) закрывает модалку */}
            
            <div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* stopPropagation() - чтобы клик по контенту не закрывал модалку */}
                
                <button className="modal-close" onClick={onClose}>
                    ✕
                </button>
                
                <h2>🎉 Поздравляем!</h2>
                
                <p>
                    Вы успешно открыли модальное окно! Модальные окна — это важный элемент 
                    пользовательского интерфейса.
                </p>
                
                <button className="modal-close-button" onClick={onClose}>
                    Закрыть окно
                </button>
            </div>
        </div>
    );
}

function App() {
    // Создайте состояние isModalOpen (boolean, начальное значение false)
    
    const openModal = () => {
        // Установите isModalOpen в true
    };
    
    const closeModal = () => {
        // Установите isModalOpen в false
    };
    
    return (
        <div className="app-container">
            <div className="main-content">
                <h1>🎭 Модальное окно</h1>
                <p>Нажмите кнопку, чтобы открыть модальное окно</p>
                
                <button className="open-modal-button" onClick={openModal}>
                    Открыть модальное окно
                </button>
            </div>
            
            {/* Передайте isModalOpen и closeModal в компонент Modal */}
            <Modal isOpen={false} onClose={() => {}} />
        </div>
    );
}

export default App;
