// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import App from '../src/13-поиск-с-автокомплитом.решение.jsx';

// Задание про useEffect с debounce: результаты появляются не сразу, а через
// задержку, и предыдущий таймер отменяется. Время в тесте фальшивое, поэтому
// вводим текст через fireEvent — userEvent при подменённом времени зависает
// (он ждёт между нажатиями на настоящем таймере).
describe('13 — поиск с автокомплитом', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    /** Ждём, пока сработает debounce поиска. */
    const settle = async (ms = 500) => {
        await act(async () => {
            vi.advanceTimersByTime(ms);
        });
    };

    const input = (container) => container.querySelector('.search-input');
    const results = (container) => container.querySelectorAll('.country-item');
    const search = async (container, text) => {
        fireEvent.focus(input(container));
        fireEvent.change(input(container), { target: { value: text } });
        await settle();
    };

    test('до ввода — приглашение начать поиск', () => {
        const { container } = render(<App />);

        expect(container.querySelector('.empty-state'), 'нет блока «empty-state»').not.toBeNull();
        expect(results(container)).toHaveLength(0);
    });

    test('поиск по названию страны', async () => {
        const { container } = render(<App />);

        await search(container, 'япон');

        expect(results(container)).toHaveLength(1);
        expect(results(container)[0]).toHaveTextContent('Япония');
    });

    test('поиск работает и по столице', async () => {
        const { container } = render(<App />);

        await search(container, 'париж');

        expect(results(container)).toHaveLength(1);
        expect(results(container)[0]).toHaveTextContent('Франция');
    });

    test('результаты появляются не мгновенно, а после задержки', async () => {
        const { container } = render(<App />);

        fireEvent.change(input(container), { target: { value: 'япон' } });
        await settle(100);

        expect(
            results(container),
            'результаты появились сразу — debounce не реализован',
        ).toHaveLength(0);

        await settle();
        expect(results(container)).toHaveLength(1);
    });

    test('выпадающий список подсказок появляется при вводе', async () => {
        const { container } = render(<App />);

        await search(container, 'а');

        const dropdown = container.querySelector('.autocomplete-dropdown');
        expect(dropdown, 'нет выпадающего списка «autocomplete-dropdown»').not.toBeNull();
        expect(dropdown.querySelectorAll('.autocomplete-item').length).toBeLessThanOrEqual(5);
    });

    test('клик по подсказке подставляет страну в поле', async () => {
        const { container } = render(<App />);

        await search(container, 'япон');
        fireEvent.click(container.querySelectorAll('.autocomplete-item')[0]);
        await settle();

        expect(input(container)).toHaveValue('Япония');
        expect(container.querySelector('.autocomplete-dropdown')).toBeNull();
    });

    test('когда ничего не найдено — заглушка', async () => {
        const { container } = render(<App />);

        await search(container, 'ццц');

        expect(results(container)).toHaveLength(0);
        expect(screen.getByText(/Ничего не найдено/)).toBeInTheDocument();
    });

    test('в карточке страны видны столица, население и континент', async () => {
        const { container } = render(<App />);

        await search(container, 'япон');

        const card = results(container)[0];
        expect(card).toHaveTextContent('Токио');
        expect(card).toHaveTextContent('126 млн');
        expect(card).toHaveTextContent('Азия');
    });
});
