import React from 'react';
 
import './style.css';

const { useState } = React;

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'question',
        message: '',
        agree: false
    });
    
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Убираем ошибку при изменении поля
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    
    const validate = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Имя обязательно для заполнения';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email обязателен для заполнения';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Телефон обязателен для заполнения';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Сообщение обязательно для заполнения';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Сообщение должно содержать минимум 10 символов';
        }
        
        if (!formData.agree) {
            newErrors.agree = 'Необходимо согласие на обработку данных';
        }
        
        return newErrors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = validate();
        
        if (Object.keys(newErrors).length === 0) {
            console.log('Отправка формы:', formData);
            setSubmitted(true);
        } else {
            setErrors(newErrors);
        }
    };
    
    if (submitted) {
        return (
            <div className="contact-form">
                <div className="success-message">
                    <h3>✅ Спасибо за ваше сообщение!</h3>
                    <p>Мы свяжемся с вами в ближайшее время.</p>
                    <p style={{ marginTop: '20px' }}>
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
            <p>Заполните форму ниже, и мы ответим вам в ближайшее время</p>
            
            <div className="form-info">
                <p>💡 Все поля обязательны для заполнения</p>
            </div>
            
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <label>
                    Имя <span className="required">*</span>
                </label>
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label>
                    Email <span className="required">*</span>
                </label>
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ivan@example.com"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                <label>
                    Телефон <span className="required">*</span>
                </label>
                <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
            
            <div className="form-group">
                <label>Тема обращения</label>
                <select name="subject" value={formData.subject} onChange={handleChange}>
                    <option value="question">Вопрос</option>
                    <option value="suggestion">Предложение</option>
                    <option value="complaint">Жалоба</option>
                </select>
            </div>
            
            <div className={`form-group ${errors.message ? 'error' : ''}`}>
                <label>
                    Сообщение <span className="required">*</span>
                </label>
                <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите подробнее..."
                />
                {errors.message && <div className="error-message">{errors.message}</div>}
            </div>
            
            <div className="form-checkbox">
                <input 
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                />
                <label htmlFor="agree">
                    Я согласен на обработку персональных данных
                </label>
            </div>
            {errors.agree && <div className="error-message">{errors.agree}</div>}
            
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
