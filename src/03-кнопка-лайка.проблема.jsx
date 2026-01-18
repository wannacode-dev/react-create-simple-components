import React from 'react';
 
import './style.css';

const { useState } = React;

function LikeButton() {
    // Создайте состояние liked (boolean, начальное значение false)
    // Создайте состояние likesCount (number, начальное значение 42)
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(1)
    
    const handleLike = () => {
        // Если уже лайкнуто - убрать лайк (liked = false, likesCount - 1)
        // Если не лайкнуто - добавить лайк (liked = true, likesCount + 1)
 
        if (liked) {
            setLiked(false)
            setLikesCount(likesCount - 1)
        } else {
            setLiked(true);
            setLikesCount(likesCount + 1)
        }
    };
    
    return (
        <div className="like-card">
            <h2>Оцените этот пост</h2>
            
            <p>Нажмите на сердечко, если вам понравилось!</p>
            
            <button
                onClick={handleLike}
                className={`like-button ${liked ? "liked" : ''}`}
                // Добавьте класс "liked" если liked === true
            >
                {/* Покажите ❤️ если liked, иначе 🤍 */}
                { liked ? "❤️" : "🤍" }
            </button>
            
            <div className="likes-count">
                {/* Покажите количество лайков */}
                <strong>{ likesCount }</strong> 
                { likesCount === 1  ? " человеку нравится" : " людям нравится"}
            </div>

            {/* Покажите сообщение "Спасибо за лайк" с классом "thank-you-message"*/}
            {
                liked ? (
                    <div className='thank-you-message'>Спасибо за лайк</div>
                ) : null
            }
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <LikeButton />
        </div>
    );
}

export default App;
