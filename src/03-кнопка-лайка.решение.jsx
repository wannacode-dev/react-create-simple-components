import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const { useState } = React;

function LikeButton() {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(42);
    
    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikesCount(likesCount - 1);
        } else {
            setLiked(true);
            setLikesCount(likesCount + 1);
        }
    };
    
    return (
        <div className="like-card">
            <h2>Оцените этот пост</h2>
            
            <p>Нажмите на сердечко, если вам понравилось!</p>
            
            <button
                onClick={handleLike}
                className={`like-button ${liked ? 'liked' : ''}`}
            >
                {liked ? '❤️' : '🤍'}
            </button>
            
            <div className="likes-count">
                <strong className={liked ? 'liked' : ''}>
                    {likesCount}
                </strong> {likesCount === 1 ? 'человеку нравится' : 'людям нравится'}
            </div>
            
            {liked && (
                <p className="thank-you-message">
                    ✨ Спасибо за лайк!
                </p>
            )}
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
