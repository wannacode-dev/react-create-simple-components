// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/14-галерея-изображений.решение.jsx';

// Задание: модалка с навигацией по индексу + подписка на клавиатуру в useEffect
// (со снятием подписки в cleanup).
describe('14 — галерея изображений', () => {
    const items = (container) => container.querySelectorAll('.gallery-item');
    const modal = (container) => container.querySelector('.modal-overlay');
    const counter = (container) => container.querySelector('.image-counter');

    test('сетка изображений отрисована', () => {
        const { container } = render(<App />);

        expect(items(container).length).toBeGreaterThanOrEqual(9);
    });

    test('сначала модального окна нет', () => {
        const { container } = render(<App />);

        expect(modal(container)).toBeNull();
    });

    test('клик по картинке открывает её в модалке', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(items(container)[0]);

        expect(modal(container), 'модалка не открылась').not.toBeNull();
        expect(screen.getByRole('heading', { name: 'Закат в горах' })).toBeInTheDocument();
        expect(counter(container).textContent.replace(/\s/g, '')).toBe('1/9');
    });

    test('стрелка «вперёд» показывает следующее изображение', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(items(container)[0]);
        await user.click(container.querySelector('.modal-nav.next'));

        expect(counter(container).textContent.replace(/\s/g, '')).toBe('2/9');
        expect(screen.getByRole('heading', { name: 'Городской пейзаж' })).toBeInTheDocument();
    });

    test('на первом изображении стрелка «назад» заблокирована', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(items(container)[0]);

        expect(container.querySelector('.modal-nav.prev')).toBeDisabled();
        expect(container.querySelector('.modal-nav.next')).not.toBeDisabled();
    });

    test('стрелки клавиатуры листают галерею', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(items(container)[0]);
        fireEvent.keyDown(window, { key: 'ArrowRight' });

        expect(counter(container).textContent.replace(/\s/g, '')).toBe('2/9');

        fireEvent.keyDown(window, { key: 'ArrowLeft' });
        expect(counter(container).textContent.replace(/\s/g, '')).toBe('1/9');
    });

    test('Escape закрывает модалку', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(items(container)[0]);
        fireEvent.keyDown(window, { key: 'Escape' });

        expect(modal(container)).toBeNull();
    });

    test('после закрытия клавиатура больше не слушается', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(items(container)[0]);
        fireEvent.keyDown(window, { key: 'Escape' });
        fireEvent.keyDown(window, { key: 'ArrowRight' });

        expect(
            modal(container),
            'подписку на клавиатуру не сняли — стрелка снова открыла модалку',
        ).toBeNull();
    });

    test('клик по фону закрывает модалку, по самому окну — нет', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(items(container)[0]);
        await user.click(container.querySelector('.modal-content'));
        expect(modal(container)).not.toBeNull();

        await user.click(modal(container));
        expect(modal(container)).toBeNull();
    });
});
