import React from 'react';
 
import './style.css';

const { useState, useEffect } = React;

// Данные стран
const COUNTRIES = [
    { id: 1, name: 'Россия', capital: 'Москва', population: '146 млн', continent: 'Европа', flag: '🇷🇺' },
    { id: 2, name: 'США', capital: 'Вашингтон', population: '331 млн', continent: 'Северная Америка', flag: '🇺🇸' },
    { id: 3, name: 'Китай', capital: 'Пекин', population: '1.4 млрд', continent: 'Азия', flag: '🇨🇳' },
    { id: 4, name: 'Япония', capital: 'Токио', population: '126 млн', continent: 'Азия', flag: '🇯🇵' },
    { id: 5, name: 'Германия', capital: 'Берлин', population: '83 млн', continent: 'Европа', flag: '🇩🇪' },
    { id: 6, name: 'Франция', capital: 'Париж', population: '67 млн', continent: 'Европа', flag: '🇫🇷' },
    { id: 7, name: 'Великобритания', capital: 'Лондон', population: '67 млн', continent: 'Европа', flag: '🇬🇧' },
    { id: 8, name: 'Италия', capital: 'Рим', population: '60 млн', continent: 'Европа', flag: '🇮🇹' },
    { id: 9, name: 'Бразилия', capital: 'Бразилиа', population: '213 млн', continent: 'Южная Америка', flag: '🇧🇷' },
    { id: 10, name: 'Австралия', capital: 'Канберра', population: '26 млн', continent: 'Австралия', flag: '🇦🇺' },
];

function SearchWithAutocomplete() {
    // Создайте состояния:
    // - searchQuery (строка поиска)
    // - suggestions (массив подсказок для автокомплита)
    // - showSuggestions (показывать ли выпадающий список)
    // - filteredCountries (отфильтрованный список стран)
    // - isSearching (индикатор поиска)
    
    // Используйте useEffect с debounce (задержка ~300мс):
    // При изменении searchQuery отфильтруйте COUNTRIES по name или capital
    // Заполните suggestions (первые 5) и filteredCountries
    
    const handleInputChange = (e) => {
        // Обновите searchQuery
        // Покажите suggestions
    };
    
    const handleSuggestionClick = (countryName) => {
        // Установите searchQuery в выбранное название
        // Скройте suggestions
    };
    
    return (
        <div className="search-container">
            <h1>🌍 Поиск стран</h1>
            
            <p className="search-hint">
                Введите название страны или столицы
            </p>
            
            {/* Поисковая строка */}
            <div className="search-box">
                <input 
                    type="text"
                    value={''} // привяжите к searchQuery
                    onChange={handleInputChange}
                    placeholder="Начните вводить название..."
                    className="search-input"
                />
                
                {/* Показывать песочные часы когда идёт поиск, иначе лупу */}
                <div className="loading-indicator">⏳</div>
                <div className="search-icon">🔍</div>
                
                {/* Отобразите выпадающий список suggestions, если showSuggestions === true */}
                <div className="autocomplete-dropdown">
                    {/* Список подсказок по клику выбирает страну */}
                </div>
            </div>
            
            {/* Результаты */}
            <div className="search-results">
                {/* Если searchQuery пустой - покажите "Начните поиск" */}
                {/* Если ничего не найдено - покажите "Ничего не найдено" */}
                {/* Иначе - покажите список filteredCountries */}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <SearchWithAutocomplete />
        </div>
    );
}

export default App;
