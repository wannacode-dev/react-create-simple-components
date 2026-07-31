import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/15-корзина-покупок.проблема.jsx';

// Задание: корзина с количеством одинаковых товаров и подсчётом итога.
describe('15 — корзина покупок', () => {
    const cartItems = (container) => container.querySelectorAll('.cart-item');
    const addButtons = (container) => container.querySelectorAll('.add-to-cart-button');
    const digits = (el) => el.textContent.replace(/[^\d]/g, '');

    test('каталог товаров отрисован', () => {
        const { container } = render(<App />);

        expect(container.querySelectorAll('.product-card').length).toBeGreaterThanOrEqual(6);
    });

    test('сначала корзина пуста', () => {
        const { container } = render(<App />);

        expect(container.querySelector('.cart-empty'), 'нет блока «cart-empty»').not.toBeNull();
        expect(cartItems(container)).toHaveLength(0);
    });

    test('товар добавляется в корзину', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(addButtons(container)[0]);

        expect(cartItems(container)).toHaveLength(1);
        expect(cartItems(container)[0]).toHaveTextContent('Ноутбук ASUS');
        expect(container.querySelector('.quantity-value')).toHaveTextContent('1');
    });

    test('повторное добавление увеличивает количество, а не дублирует строку', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(addButtons(container)[0]);
        await user.click(addButtons(container)[0]);

        expect(cartItems(container), 'товар задвоился вместо увеличения количества').toHaveLength(1);
        expect(container.querySelector('.quantity-value')).toHaveTextContent('2');
    });

    test('кнопки +/− меняют количество', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(addButtons(container)[0]);
        const [minus, plus] = container.querySelectorAll('.quantity-button');

        await user.click(plus);
        expect(container.querySelector('.quantity-value')).toHaveTextContent('2');

        await user.click(minus);
        expect(container.querySelector('.quantity-value')).toHaveTextContent('1');
    });

    test('минус не уводит количество ниже единицы', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(addButtons(container)[0]);
        await user.click(container.querySelectorAll('.quantity-button')[0]);
        await user.click(container.querySelectorAll('.quantity-button')[0]);

        expect(container.querySelector('.quantity-value')).toHaveTextContent('1');
    });

    test('кнопка «Удалить» убирает товар', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(addButtons(container)[0]);
        await user.click(container.querySelector('.remove-button'));

        expect(cartItems(container)).toHaveLength(0);
        expect(container.querySelector('.cart-empty')).not.toBeNull();
    });

    test('счётчик в шапке корзины считает штуки, а не строки', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(addButtons(container)[0]);
        await user.click(addButtons(container)[0]);
        await user.click(addButtons(container)[1]);

        expect(container.querySelector('.cart-badge'), 'нет счётчика «cart-badge»').toHaveTextContent(
            '3',
        );
    });

    test('итог = сумма товаров плюс доставка', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(addButtons(container)[0]); // 75 000 ₽
        await user.click(addButtons(container)[1]); // 8 500 ₽

        const rows = container.querySelectorAll('.summary-row');
        expect(rows.length, 'нет блока итогов «summary-row»').toBeGreaterThanOrEqual(3);
        expect(digits(rows[0])).toBe('283500'); // «Товары (2): 83 500 ₽»
        expect(digits(rows[1])).toBe('500'); // доставка
        expect(digits(rows[2])).toBe('84000'); // итого
    });

    test('в пустой корзине итогов нет', () => {
        const { container } = render(<App />);

        expect(container.querySelectorAll('.summary-row')).toHaveLength(0);
    });
});
