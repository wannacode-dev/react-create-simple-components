import React from 'react';
 
import './style.css';

const { useState } = React;

// Имитация данных постов
const POSTS = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Пост номер ${i + 1}: Изучаем React`,
    body: `Это содержимое поста ${i + 1}. React - отличная библиотека!`,
    date: new Date(2024, 0, 1 + i).toLocaleDateString('ru-RU')
}));

function Pagination() {
    // Создайте состояния:
    // - currentPage (число, начальное: 1)
    // - postsPerPage (число, начальное: 10)
    
    // Вычислите:
    // - indexOfLastPost = currentPage * postsPerPage
    // - indexOfFirstPost = indexOfLastPost - postsPerPage
    // - currentPosts = POSTS.slice(indexOfFirstPost, indexOfLastPost)
    // - totalPages = Math.ceil(POSTS.length / postsPerPage)
    
    const goToPage = (page) => {
        // Установите currentPage в page
    };
    
    const goToNextPage = () => {
        // Увеличьте currentPage на 1 (если не последняя страница)
    };
    
    const goToPrevPage = () => {
        // Уменьшите currentPage на 1 (если не первая страница)
    };
    
    return (
        <div className="pagination-container">
            <h1>📄 Посты с пагинацией</h1>

            {/* Настройки */}
            <div className="settings-panel">
                <label>Постов на странице:</label>
                {/* Сколько постов отображать */}
            </div>
            
            {/* Отобразите currentPosts */}
            <div className="posts-list">
                {/* Используйте map для отображения постов */}
            </div>
            
            {/* Пагинация */}
            <div className="pagination">
                <button 
                    onClick={goToPrevPage}
                    disabled={false} // Заблокируйте если currentPage === 1
                    className="pagination-button"
                >
                    ← Назад
                </button>
                
                {/* Создайте кнопки для страниц */}
                {/* Совет: можно использовать Array.from({ length: totalPages }) */}
                
                <button 
                    onClick={goToNextPage}
                    disabled={false} // Заблокируйте если currentPage === totalPages
                    className="pagination-button"
                >
                    Вперёд →
                </button>
            </div>
            
            {/* Информация */}
            <div className="pagination-info">
                Страница <strong>?</strong> из <strong>?</strong>
                {' • '}
                Показаны посты <strong>?</strong> из <strong>?</strong>
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <Pagination />
        </div>
    );
}

export default App;
