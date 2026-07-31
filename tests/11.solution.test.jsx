// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/11-пагинация.решение.jsx';

// Задание: срез данных по текущей странице, кнопки навигации и их
// заблокированные состояния на краях списка.
describe('11 — пагинация', () => {
    const posts = (container) => container.querySelectorAll('.post-item');
    const ids = (container) =>
        [...container.querySelectorAll('.post-id')].map((e) => e.textContent.trim());

    test('на первой странице десять постов', () => {
        const { container } = render(<App />);

        expect(posts(container)).toHaveLength(10);
        expect(ids(container)[0]).toBe('#1');
        expect(ids(container)[9]).toBe('#10');
    });

    test('кнопка «Назад» на первой странице заблокирована', () => {
        const { container } = render(<App />);
        const [prev] = container.querySelectorAll('.pagination-button');

        expect(prev).toBeDisabled();
    });

    test('«Вперёд» показывает следующие десять постов', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByRole('button', { name: /Вперёд/ }));

        expect(ids(container)[0]).toBe('#11');
        expect(posts(container)).toHaveLength(10);
    });

    test('клик по номеру страницы переходит на неё', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByRole('button', { name: '3' }));

        expect(ids(container)[0]).toBe('#21');
        expect(screen.getByRole('button', { name: '3' })).toHaveClass('active');
    });

    test('активна ровно одна страница', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByRole('button', { name: '3' }));

        expect(container.querySelectorAll('.page-button.active')).toHaveLength(1);
    });

    test('смена количества постов на странице сбрасывает на первую', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByRole('button', { name: /Вперёд/ }));
        await user.selectOptions(screen.getByRole('combobox'), '5');

        expect(posts(container)).toHaveLength(5);
        expect(ids(container)[0]).toBe('#1');
    });

    test('на последней странице «Вперёд» заблокирована', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByRole('button', { name: '10' }));

        expect(ids(container)[0]).toBe('#91');
        expect(screen.getByRole('button', { name: /Вперёд/ })).toBeDisabled();
        expect(container.querySelectorAll('.pagination-button')[0]).not.toBeDisabled();
    });

    test('подпись показывает текущую страницу и диапазон постов', () => {
        const { container } = render(<App />);
        const info = container.querySelector('.pagination-info');

        expect(info, 'нет блока «pagination-info»').not.toBeNull();
        expect(info.textContent.replace(/\s+/g, ' ')).toMatch(/Страница 1 из 10/);
    });
});
