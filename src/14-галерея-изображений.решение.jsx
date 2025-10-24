import './style.css';

const { useState, useEffect } = React;

// Данные изображений
const IMAGES = [
    { id: 1, url: 'public/avatars/avatar1woman.jpg', title: 'Закат в горах', author: 'Анна Иванова' },
    { id: 2, url: 'public/avatars/avatar2men.jpg', title: 'Городской пейзаж', author: 'Иван Петров' },
    { id: 3, url: 'public/avatars/avatar3woman.jpg', title: 'Лесная тропа', author: 'Мария Сидорова' },
    { id: 4, url: 'public/avatars/avatar4men.jpg', title: 'Морской берег', author: 'Пётр Смирнов' },
    { id: 5, url: 'public/avatars/laptop1.jpg', title: 'Горное озеро', author: 'Елена Козлова' },
    { id: 6, url: 'public/avatars/iphone1.jpg', title: 'Осенний парк', author: 'Дмитрий Волков' },
    { id: 7, url: 'public/avatars/keyboard1.jpg', title: 'Ночной город', author: 'Ольга Морозова' },
    { id: 8, url: 'public/avatars/mouse1.jpg', title: 'Весенние цветы', author: 'Николай Новиков' },
    { id: 9, url: 'public/avatars/monitor1.jpg', title: 'Зимний лес', author: 'Татьяна Белова' },
];

function ImageGallery() {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    
    const openModal = (index) => {
        setSelectedImageIndex(index);
    };
    
    const closeModal = () => {
        setSelectedImageIndex(null);
    };
    
    const goToNext = () => {
        if (selectedImageIndex < IMAGES.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };
    
    const goToPrev = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };
    
    // Обработка клавиш клавиатуры
    useEffect(() => {
        if (selectedImageIndex === null) return;
        
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'ArrowLeft') {
                goToPrev();
            }
        };
        
        window.addEventListener('keydown', handleKeyPress);
        
        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedImageIndex]);
    
    const selectedImage = selectedImageIndex !== null ? IMAGES[selectedImageIndex] : null;
    
    return (
        <div className="gallery-container">
            <h1>📷 Фотогалерея</h1>
            
            {/* Сетка изображений */}
            <div className="gallery-grid">
                {IMAGES.map((image, index) => (
                    <div 
                        key={image.id}
                        className="gallery-item"
                        onClick={() => openModal(index)}
                    >
                        <img src={image.url} alt={image.title} />
                        <div className="gallery-item-overlay">
                            <div className="image-title">{image.title}</div>
                            <div className="image-author">📸 {image.author}</div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Модальное окно */}
            {selectedImage && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ✕
                        </button>
                        
                        {/* Навигация */}
                        <button 
                            className="modal-nav prev"
                            onClick={goToPrev}
                            disabled={selectedImageIndex === 0}
                        >
                            ‹
                        </button>
                        
                        <button 
                            className="modal-nav next"
                            onClick={goToNext}
                            disabled={selectedImageIndex === IMAGES.length - 1}
                        >
                            ›
                        </button>
                        
                        {/* Изображение */}
                        <img 
                            src={selectedImage.url} 
                            alt={selectedImage.title}
                            className="modal-image"
                        />
                        
                        {/* Информация */}
                        <div className="modal-info">
                            <h2>{selectedImage.title}</h2>
                            <p>📸 Автор: {selectedImage.author}</p>
                        </div>
                        
                        {/* Счетчик */}
                        <div className="image-counter">
                            {selectedImageIndex + 1} / {IMAGES.length}
                        </div>
                        
                        {/* Миниатюры */}
                        <div className="modal-thumbnails">
                            {IMAGES.map((image, index) => (
                                <img 
                                    key={image.id}
                                    src={image.url}
                                    alt={image.title}
                                    className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                                    onClick={() => setSelectedImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

