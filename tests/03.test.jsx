import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/03-кнопка-лайка.проблема.jsx';

// Задание про состояние: один клик ставит лайк, второй снимает. Поэтому тут
// не только «что нарисовано», но и «что меняется после клика».
describe('03 — кнопка лайка', () => {
    const getButton = (container) => container.querySelector('.like-button');
    const getCount = (container) => container.querySelector('.likes-count');

    test('до клика: белое сердце, 42 лайка, кнопка без класса «liked»', () => {
        const { container } = render(<App />);
        const button = getButton(container);

        expect(button, 'нет кнопки с классом «like-button»').not.toBeNull();
        expect(button).toHaveTextContent('🤍');
        expect(button).not.toHaveClass('liked');
        expect(getCount(container)).toHaveTextContent('42');
    });

    test('до клика благодарности нет', () => {
        const { container } = render(<App />);

        expect(container.querySelector('.thank-you-message')).toBeNull();
    });

    test('клик ставит лайк: красное сердце, 43, класс «liked»', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(getButton(container));

        expect(getButton(container)).toHaveTextContent('❤️');
        expect(getButton(container)).toHaveClass('liked');
        expect(getCount(container)).toHaveTextContent('43');
    });

    test('после лайка появляется сообщение с классом «thank-you-message»', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(getButton(container));

        const message = container.querySelector('.thank-you-message');
        expect(message, 'нет элемента с классом «thank-you-message»').not.toBeNull();
        expect(message.textContent.trim()).not.toBe('');
    });

    test('повторный клик снимает лайк и возвращает счётчик к 42', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(getButton(container));
        await user.click(getButton(container));

        expect(getButton(container)).toHaveTextContent('🤍');
        expect(getButton(container)).not.toHaveClass('liked');
        expect(getCount(container)).toHaveTextContent('42');
        expect(container.querySelector('.thank-you-message')).toBeNull();
    });

    test('заголовок карточки на месте', () => {
        render(<App />);

        expect(screen.getByText('Оцените этот пост')).toBeInTheDocument();
    });
});
