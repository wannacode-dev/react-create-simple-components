import React from 'react';
 
import './style.css';

const { useState, useEffect } = React;

// Данные изображений
const IMAGES = [
    { id: 1, url: '🌄', title: 'Закат в горах', author: 'Анна Иванова' },
    { id: 2, url: '🏙️', title: 'Городской пейзаж', author: 'Иван Петров' },
    { id: 3, url: '🌲', title: 'Лесная тропа', author: 'Мария Сидорова' },
    { id: 4, url: '🏖️', title: 'Морской берег', author: 'Пётр Смирнов' },
    { id: 5, url: '💻', title: 'Горное озеро', author: 'Елена Козлова' },
    { id: 6, url: '🍂', title: 'Осенний парк', author: 'Дмитрий Волков' },
    { id: 7, url: '🌃', title: 'Ночной город', author: 'Ольга Морозова' },
    { id: 8, url: '🌸', title: 'Весенние цветы', author: 'Николай Новиков' },
    { id: 9, url: '🌨️', title: 'Зимний лес', author: 'Татьяна Белова' },
];

function ImageGallery() {
    // Создайте состояние selectedImageIndex (число или null)
    // null - модалка закрыта, число - индекс открытого изображения
    
    const openModal = (index) => {
        // Откройте модалку с изображением по индексу
    };
    
    const closeModal = () => {
        // Закройте модалку (установите selectedImageIndex в null)
    };
    
    const goToNext = () => {
        // Переключите на следующее изображение
        // Проверьте, что не последнее
    };
    
    const goToPrev = () => {
        // Переключите на предыдущее изображение  
        // Проверьте, что не первое
    };
    
    // Обработка клавиш клавиатуры (опционально)
    useEffect(() => {
        // Если модалка не открыта - ничего не делаем
        
        const handleKeyPress = (e) => {
            // Escape - закрыть модалку
            // ArrowRight - следующее изображение
            // ArrowLeft - предыдущее изображение
        };
        
        window.addEventListener('keydown', handleKeyPress);
        
        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [/* зависимости */]);
    
    return (
        <div className="gallery-container">
            <h1>📷 Фотогалерея</h1>
            
            {/* Сетка изображений */}
            <div className="gallery-grid">
                {IMAGES.map((image, index) => (
                    <div 
                        key={image.id}
                        className="gallery-item"
                        onClick={() => {/* Откройте модалку */}}
                    >
                        <div 
                            className="gallery-emoji"
                            role="img"
                            aria-label={image.title}
                        >
                            {image.url}
                        </div>
                        <div className="gallery-item-overlay">
                            <div className="image-title">{image.title}</div>
                            <div className="image-author">📸 {image.author}</div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Модальное окно */}
            {/* Показывайте только если selectedImageIndex !== null */}
            {/* Используйте класс "modal-overlay" */}
            {/* При клике на overlay - закрывайте модалку */}
            {/* При клике на контент - stopPropagation() */}
            {/* Добавьте кнопки навигации (prev/next) */}
            {/* Покажите текущее изображение */}
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <ImageGallery />
        </div>
    );
}

export default App;

