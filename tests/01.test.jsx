import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/01-первое-приветствие.проблема.jsx';

// Имя, роль и эмодзи студент выбирает сам — проверяем не конкретный текст,
// а что элементы есть, не пустые и лежат под нужными классами.
describe('01 — первое приветствие', () => {
    test('эмодзи выводится в блоке с классом «emoji»', () => {
        const { container } = render(<App />);
        const emoji = container.querySelector('.emoji');

        expect(emoji, 'нет элемента с классом «emoji»').not.toBeNull();
        expect(emoji.textContent.trim()).not.toBe('');
    });

    test('заголовок с классом «title» здоровается по имени', () => {
        const { container } = render(<App />);
        const title = container.querySelector('.title');

        expect(title, 'нет элемента с классом «title»').not.toBeNull();
        // «Привет! Я » плюс хоть какое-то имя после него.
        expect(title.textContent.replace(/\s+/g, ' ').trim()).toMatch(/^Привет! Я .+/);
    });

    test('роль выводится в элементе с классом «role»', () => {
        const { container } = render(<App />);
        const role = container.querySelector('.role');

        expect(role, 'нет элемента с классом «role»').not.toBeNull();
        expect(role.textContent.trim()).not.toBe('');
    });

    test('есть параграф «Добро пожаловать в мир React!» с классом «description»', () => {
        const { container } = render(<App />);
        const description = container.querySelector('.description');

        expect(description, 'нет элемента с классом «description»').not.toBeNull();
        expect(description).toHaveTextContent('Добро пожаловать в мир React!');
    });

    test('карточка приветствия отрисована целиком', () => {
        render(<App />);

        expect(screen.getByText(/Добро пожаловать в мир React!/)).toBeInTheDocument();
    });
});
