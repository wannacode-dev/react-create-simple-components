import React from 'react';
 
import './style.css';

const { useState, useEffect } = React;

function CountdownTimer() {
    const [inputMinutes, setInputMinutes] = useState(1);
    const [timeLeft, setTimeLeft] = useState(60); // в секундах
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    
    // Таймер с помощью useEffect
    useEffect(() => {
        if (!isRunning || isPaused) return;
        
        if (timeLeft <= 0) {
            setIsRunning(false);
            return;
        }
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        // Cleanup функция - очищаем интервал при размонтировании
        return () => clearInterval(timer);
    }, [isRunning, isPaused, timeLeft]);
    
    const startTimer = () => {
        if (!isRunning) {
            setTimeLeft(inputMinutes * 60);
        }
        setIsRunning(true);
        setIsPaused(false);
    };
    
    const pauseTimer = () => {
        setIsPaused(true);
    };
    
    const resumeTimer = () => {
        setIsPaused(false);
    };
    
    const stopTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(0);
    };
    
    const resetTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(inputMinutes * 60);
    };
    
    // Форматирование времени в MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    
    return (
        <div className="timer-card">
            <h1>⏰ Таймер обратного отсчёта</h1>
            
            {!isRunning && timeLeft === inputMinutes * 60 && (
                <div className="input-section">
                    <label>Установите время (минуты):</label>
                    <input 
                        type="number"
                        min="1"
                        max="99"
                        value={inputMinutes}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            setInputMinutes(value);
                            setTimeLeft(value * 60);
                        }}
                    />
                </div>
            )}
            
            <div className="timer-display">
                {formatTime(timeLeft)}
            </div>
            
            <div className="controls">
                {!isRunning && timeLeft > 0 && (
                    <button 
                        onClick={startTimer}
                        className="control-button start"
                    >
                        ▶️ Старт
                    </button>
                )}
                
                {isRunning && !isPaused && (
                    <button 
                        onClick={pauseTimer}
                        className="control-button pause"
                    >
                        ⏸️ Пауза
                    </button>
                )}
                
                {isPaused && (
                    <button 
                        onClick={resumeTimer}
                        className="control-button start"
                    >
                        ▶️ Продолжить
                    </button>
                )}
                
                {(isRunning || isPaused) && (
                    <button 
                        onClick={stopTimer}
                        className="control-button stop"
                    >
                        ⏹️ Стоп
                    </button>
                )}
                
                {(timeLeft !== inputMinutes * 60 || timeLeft === 0) && !isRunning && (
                    <button 
                        onClick={resetTimer}
                        className="control-button reset"
                    >
                        🔄 Сброс
                    </button>
                )}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <CountdownTimer />
        </div>
    );
}

export default App;

