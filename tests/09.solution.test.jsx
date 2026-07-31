// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/09-фильтр-товаров.решение.jsx';

// Задание: четыре независимых фильтра работают вместе, плюс сброс.
describe('09 — фильтр товаров', () => {
    const cards = (container) => container.querySelectorAll('.product-card');
    const search = () => screen.getByPlaceholderText(/Введите название/);

    test('сначала показаны все шесть товаров', () => {
        const { container } = render(<App />);

        expect(cards(container)).toHaveLength(6);
    });

    test('поиск по названию отбирает товары', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.type(search(), 'iphone');

        expect(cards(container)).toHaveLength(1);
        expect(cards(container)[0]).toHaveTextContent('iPhone 15');
    });

    test('фильтр по категории работает', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.selectOptions(screen.getByRole('combobox'), 'Одежда');

        expect(cards(container)).toHaveLength(2);
    });

    test('фильтр по минимальной цене работает', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.type(screen.getByPlaceholderText('0'), '40000');

        expect(cards(container)).toHaveLength(2);
    });

    test('фильтры по цене складываются в диапазон', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.type(screen.getByPlaceholderText('0'), '3000');
        await user.type(screen.getByPlaceholderText('100000'), '30000');

        expect(cards(container)).toHaveLength(2);
    });

    test('счётчик найденных товаров обновляется', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.selectOptions(screen.getByRole('combobox'), 'Одежда');

        expect(container.querySelector('.products-info').textContent).toMatch(/Найдено товаров:\s*2/);
    });

    test('когда ничего не найдено — заглушка', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.type(search(), 'ццц');

        expect(cards(container)).toHaveLength(0);
        expect(screen.getByText('Товары не найдены')).toBeInTheDocument();
    });

    test('кнопка сбрасывает все фильтры разом', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.type(search(), 'iphone');
        await user.type(screen.getByPlaceholderText('0'), '50000');
        await user.click(container.querySelector('.reset-button'));

        expect(cards(container)).toHaveLength(6);
        expect(search()).toHaveValue('');
    });
});
