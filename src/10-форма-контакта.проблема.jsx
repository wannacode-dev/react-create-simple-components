import React from 'react';
 
import './style.css';

const { useState } = React;

function ContactForm() {
    // Создайте состояние formData (объект) с полями:
    // - name (строка)
    // - email (строка)
    // - phone (строка)
    // - subject (строка, начальное: 'question')
    // - message (строка)
    // - agree (boolean)
    
    // Создайте состояние errors (объект) для хранения ошибок валидации
    // Создайте состояние submitted (boolean) - отправлена ли форма
    
    const handleChange = (e) => {
        // Получите name, value, type, checked из e.target
        // Обновите formData
        // Для checkbox используйте checked, для остальных - value
    };
    
    const validate = () => {
        const newErrors = {};
        
        // Проверьте, что все обязательные поля заполнены
        // Проверьте корректность email (можно использовать regex)
        // Проверьте минимальную длину сообщения (например, 10 символов)
        // Проверьте, что agree === true
        
        return newErrors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Вызовите validate()
        // Если ошибок нет - установите submitted в true
        // Если есть ошибки - сохраните их в errors
    };

      if (submitted) {
        return (
            <div className="contact-form">
                <div className="success-message">
                    <h3>✅ Спасибо за ваше сообщение!</h3>
                    <p>Мы свяжемся с вами в ближайшее время.</p>
                    <p>
                        <strong>Ваши данные:</strong><br />
                        Имя: {formData.name}<br />
                        Email: {formData.email}<br />
                        Тема: {formData.subject === 'question' ? 'Вопрос' : formData.subject === 'suggestion' ? 'Предложение' : 'Жалоба'}
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h1>📧 Свяжитесь с нами</h1>
            <p>Заполните форму ниже</p>

            <div className="form-info">
                <p>💡 Все поля обязательны для заполнения</p>
            </div>
            
            {/* Создайте поля формы:
                - Имя (input text)
                - Email (input email)
                - Телефон (input tel)
                - Тема (select с опциями: question, suggestion, complaint)
                - Сообщение (textarea)
                - Согласие на обработку (checkbox)
            */}
            
            {/* Добавьте отображение ошибок */}
            
            <button type="submit" className="submit-button">
                Отправить сообщение
            </button>
        </form>
    );
}

function App() {
    return (
        <div className="app-container">
            <ContactForm />
        </div>
    );
}

export default App;
