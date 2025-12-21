import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const { useState } = React;

// Имитация данных постов
const POSTS = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Пост номер ${i + 1}: Изучаем React`,
    body: `Это содержимое поста ${i + 1}. React - отличная библиотека для создания пользовательских интерфейсов. В этом посте мы рассмотрим различные аспекты работы с React и узнаем много нового!`,
    date: new Date(2024, 0, 1 + i).toLocaleDateString('ru-RU')
}));

function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    
    // Вычисляем индексы постов для текущей страницы
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = POSTS.slice(indexOfFirstPost, indexOfLastPost);
    
    // Общее количество страниц
    const totalPages = Math.ceil(POSTS.length / postsPerPage);
    
    // Функции навигации
    const goToPage = (page) => {
        setCurrentPage(page);
    };
    
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    // Генерация номеров страниц для отображения
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };
    
    return (
        <div className="pagination-container">
            <h1>📄 Посты с пагинацией</h1>
            
            {/* Настройки */}
            <div className="settings-panel">
                <label>Постов на странице:</label>
                <select 
                    value={postsPerPage} 
                    onChange={(e) => {
                        setPostsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Сбрасываем на первую страницу
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            
            {/* Список постов */}
            <div className="posts-list">
                {currentPosts.map(post => (
                    <div key={post.id} className="post-item">
                        <div className="post-header">
                            <span className="post-id">#{post.id}</span>
                            <span className="post-date">📅 {post.date}</span>
                        </div>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-body">{post.body}</p>
                    </div>
                ))}
            </div>
            
            {/* Пагинация */}
            <div className="pagination">
                <button 
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    ← Назад
                </button>
                
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`dots-${index}`} className="pagination-dots">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`page-button ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    )
                ))}
                
                <button 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Вперёд →
                </button>
            </div>
            
            {/* Информация */}
            <div className="pagination-info">
                Страница <strong>{currentPage}</strong> из <strong>{totalPages}</strong>
                {' • '}
                Показаны посты <strong>{indexOfFirstPost + 1}</strong>-<strong>{Math.min(indexOfLastPost, POSTS.length)}</strong> из <strong>{POSTS.length}</strong>
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
