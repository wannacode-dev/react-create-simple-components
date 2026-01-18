import React from 'react';

import './style.css';

const { useState } = React;

const PRODUCTS = [
    { id: 1, name: 'Ноутбук ASUS', category: 'Электроника', price: 45000, image: '💻' },
    { id: 2, name: 'iPhone 15', category: 'Электроника', price: 80000, image: '📱' },
    { id: 3, name: 'Футболка Nike', category: 'Одежда', price: 2500, image: '👕' },
    { id: 4, name: 'Кроссовки Adidas', category: 'Одежда', price: 7000, image: '👟' },
    { id: 5, name: 'Холодильник LG', category: 'Бытовая техника', price: 35000, image: '🧊' },
    { id: 6, name: 'Стиральная машина Samsung', category: 'Бытовая техника', price: 25000, image: '🧺' },
];

function ProductsFilter() {
    // Создайте состояния:
    // - category (начальное значение: 'all')
    // - minPrice (начальное значение: '')
    // - maxPrice (начальное значение: '')
    // - searchQuery (начальное значение: '')

    const filteredProducts = PRODUCTS; // TODO: Отфильтруйте товары

    // Фильтрация:
    // 1. По категории (если category !== 'all')
    // 2. По минимальной цене (если minPrice не пустой)
    // 3. По максимальной цене (если maxPrice не пустой)
    // 4. По поиску (если searchQuery не пустой)

    return (
        <div className="products-container">
            <h1>🛍️ Интернет-магазин</h1>

            {/* Панель фильтров */}
            <div className="filters-panel">
                <h3>Фильтры</h3>

                <div className="filters-row">
                    <div className="filter-group">
                        {/* Поле поиска */}
                    </div>

                    <div className="filter-group">
                        {/* Выбор категории */}
                    </div>

                    <div className="filter-group">
                        {/* Цена от */}
                    </div>

                    <div className="filter-group">
                        {/* Цена до */}
                    </div>

                    <div className="filter-group">
                        {/* Сбросить фильтры */}
                    </div>

                </div>
            </div>

            <div className="products-info">
                {/* Информация о результатах */}
                <div>
                    {/* Сколько товаров найдено*/}
                </div>
                <div>
                    {/* Сколько товаров всего*/}
                </div>
            </div>


            {/* Сетка товаров */}
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div
                        key={product.id} 
                        className="product-card" 
                    >
                        <div
                            className="product-image"
                            role="img"
                        >
                            {product.image}
                        </div>
                        <div className="product-info">
                            <div className="product-category">
                                {product.category}
                            </div>
                            <h3 className="product-name">
                                {product.name}
                            </h3>
                            <div className="product-price">
                                {product.price.toLocaleString()} ₽
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <ProductsFilter />
        </div>
    );
}

export default App;

