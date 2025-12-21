import React from 'react';
 
import './style.css';

const { useState } = React;

// Данные товаров
const PRODUCTS = [
    { id: 1, name: 'Ноутбук ASUS', description: 'Intel Core i7, 16GB RAM, 512GB SSD', price: 75000, image: '💻' },
    { id: 2, name: 'Клавиатура механическая', description: 'RGB подсветка, Cherry MX Red', price: 8500, image: '⌨️' },
    { id: 3, name: 'Мышь беспроводная', description: 'Logitech MX Master 3', price: 7200, image: '🖱️' },
    { id: 4, name: 'Монитор 27"', description: '2K, 144Hz, IPS', price: 32000, image: '🖥️' },
    { id: 5, name: 'Наушники', description: 'Sony WH-1000XM4, шумоподавление', price: 22000, image: '🎧' },
    { id: 6, name: 'Веб-камера', description: 'Logitech C920, Full HD', price: 5500, image: '📷' },
];

function ShoppingCart() {
    const [cart, setCart] = useState([]);
    
    // Добавить товар в корзину
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            // Товар уже в корзине - увеличиваем количество
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // Добавляем новый товар
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };
    
    // Увеличить количество
    const incrementQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };
    
    // Уменьшить количество
    const decrementQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
        ));
    };
    
    // Удалить товар из корзины
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };
    
    // Очистить корзину
    const clearCart = () => {
        setCart([]);
    };
    
    // Вычисления
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cart.length > 0 ? 500 : 0;
    const total = subtotal + shipping;
    
    return (
        <div className="shop-container">
            <h1>🛒 Интернет-магазин</h1>
            
            <div className="shop-layout">
                {/* Список товаров */}
                <div className="products-section">
                    <h2>Каталог товаров</h2>
                    <div className="products-list">
                        {PRODUCTS.map(product => (
                            <div key={product.id} className="product-card" data-category="Электроника">
                                <div 
                                    className="product-image"
                                    role="img"
                                    aria-label={product.name}
                                >
                                    {product.image}
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-price">
                                        {product.price.toLocaleString()} ₽
                                    </div>
                                </div>
                                <button 
                                    onClick={() => addToCart(product)}
                                    className="add-to-cart-button"
                                >
                                    В корзину
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Корзина */}
                <div className="cart-section">
                    <h2>
                        Корзина
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </h2>
                    
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <div className="icon">🛒</div>
                            <p>Корзина пуста</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div 
                                            className="cart-item-image"
                                            role="img"
                                            aria-label={item.name}
                                        >
                                            {item.image}
                                        </div>
                                        <div className="cart-item-info">
                                            <h4 className="cart-item-name">{item.name}</h4>
                                            <div className="cart-item-price">
                                                {item.price.toLocaleString()} ₽
                                            </div>
                                            <div className="quantity-controls">
                                                <button 
                                                    onClick={() => decrementQuantity(item.id)}
                                                    className="quantity-button"
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button 
                                                    onClick={() => incrementQuantity(item.id)}
                                                    className="quantity-button"
                                                >
                                                    +
                                                </button>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="remove-button"
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Товары ({totalItems}):</span>
                                    <span>{subtotal.toLocaleString()} ₽</span>
                                </div>
                                <div className="summary-row">
                                    <span>Доставка:</span>
                                    <span>{shipping.toLocaleString()} ₽</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Итого:</span>
                                    <span>{total.toLocaleString()} ₽</span>
                                </div>
                                
                                <button 
                                    className="checkout-button"
                                    onClick={() => {
                                        alert(`Заказ оформлен на сумму ${total.toLocaleString()} ₽`);
                                        clearCart();
                                    }}
                                >
                                    Оформить заказ
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <ShoppingCart />
        </div>
    );
}

export default App;

