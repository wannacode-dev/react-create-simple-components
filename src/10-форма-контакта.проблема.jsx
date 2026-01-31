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

    // Создайте состояние errors (объект ошибок валидации)
    // Создайте состояние submitted (boolean, успешная отправка)

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

    // Если submitted === true - покажите сообщение "Спасибо за ваше сообщение!" и данные формы

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

            <div className="form-group">
                <label>
                    Имя <span className="required">*</span>
                </label>

                {/* Имя (input text) */}
            </div>

            <div className="form-group">
                <label>
                    Email <span className="required">*</span>
                </label>

                {/* Email (input email) */}
            </div>

            <div className="form-group">
                <label>
                    Телефон <span className="required">*</span>
                </label>

                {/* Телефон (input tel) */}
            </div>

            <div className="form-group">
                <label>Тема обращения</label>

                {/* Тема (select с опциями: question, suggestion, complaint) */}
            </div>

            <div className="form-group">
                <label>
                    Сообщение <span className="required">*</span>
                </label>

                {/* Сообщение (textarea) */}
            </div>

            <div className="form-group">
                {/* Согласие на обработку (checkbox) */}
            </div>

            {/* Добавьте отображение ошибок (errors) и класс error для полей с ошибкой */}

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
