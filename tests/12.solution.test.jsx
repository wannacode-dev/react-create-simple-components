// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import App from '../src/12-таймер-обратного-отсчета.решение.jsx';

// Задание про useEffect и таймер. Настоящие секунды ждать нельзя, поэтому время
// в тесте фальшивое (vi.useFakeTimers) и мы двигаем его вручную.
//
// Здесь fireEvent, а не userEvent: userEvent между нажатиями ждёт на настоящем
// таймере, которого при фальшивом времени уже нет, и тест просто виснет.
// fireEvent синхронный — с подменённым временем он и нужен.
describe('12 — таймер обратного отсчёта', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    const tick = async (seconds) => {
        await act(async () => {
            vi.advanceTimersByTime(seconds * 1000);
        });
    };

    const display = (container) => container.querySelector('.timer-display');
    const press = (name) => fireEvent.click(screen.getByRole('button', { name }));

    test('сначала на табло минута', () => {
        const { container } = render(<App />);

        expect(display(container), 'нет блока «timer-display»').not.toBeNull();
        expect(display(container)).toHaveTextContent('01:00');
    });

    test('старт запускает отсчёт', async () => {
        const { container } = render(<App />);

        press(/Старт/);
        await tick(3);

        expect(display(container)).toHaveTextContent('00:57');
    });

    test('пауза останавливает время', async () => {
        const { container } = render(<App />);

        press(/Старт/);
        await tick(2);
        press(/Пауза/);
        await tick(5);

        expect(display(container)).toHaveTextContent('00:58');
    });

    test('«Продолжить» возобновляет отсчёт', async () => {
        const { container } = render(<App />);

        press(/Старт/);
        await tick(2);
        press(/Пауза/);
        press(/Продолжить/);
        await tick(3);

        expect(display(container)).toHaveTextContent('00:55');
    });

    test('стоп обнуляет табло', async () => {
        const { container } = render(<App />);

        press(/Старт/);
        await tick(2);
        press(/Стоп/);

        expect(display(container)).toHaveTextContent('00:00');
    });

    test('сброс возвращает установленное время', async () => {
        const { container } = render(<App />);

        press(/Старт/);
        await tick(2);
        press(/Стоп/);
        press(/Сброс/);

        expect(display(container)).toHaveTextContent('01:00');
    });

    test('таймер останавливается сам, досчитав до нуля', async () => {
        const { container } = render(<App />);

        press(/Старт/);
        await tick(60);

        expect(display(container)).toHaveTextContent('00:00');
        expect(screen.queryByRole('button', { name: /Пауза/ })).toBeNull();
    });

    test('время можно задать в минутах', () => {
        const { container } = render(<App />);
        const input = container.querySelector('.input-section input');

        expect(input, 'нет поля ввода минут').not.toBeNull();
        fireEvent.change(input, { target: { value: '2' } });

        expect(display(container)).toHaveTextContent('02:00');
    });
});
