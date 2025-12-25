import React from 'react';
 
import './style.css';

const { useState } = React;

function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    ✕
                </button>
                
                <h2>🎉 Поздравляем!</h2>
                
                <p>
                    Вы успешно открыли модальное окно! Модальные окна — это важный элемент 
                    пользовательского интерфейса, который помогает привлечь внимание к важной информации.
                </p>
                
                <p><strong>Что можно сделать с модальными окнами:</strong></p>
                <ul>
                    <li>Показать форму входа или регистрации</li>
                    <li>Подтвердить важное действие (удаление, выход)</li>
                    <li>Показать детальную информацию о элементе</li>
                    <li>Вывести галерею изображений</li>
                    <li>Показать уведомление или сообщение об ошибке</li>
                </ul>
                
                <div className="modal-info">
                    <p>
                        💡 <strong>Совет:</strong> Вы можете закрыть это окно, нажав на крестик, 
                        на кнопку ниже или кликнув вне окна (на затемнённый фон).
                    </p>
                </div>
                
                <button className="modal-close-button" onClick={onClose}>
                    Закрыть окно
                </button>
            </div>
        </div>
    );
}

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
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
            
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default App;
