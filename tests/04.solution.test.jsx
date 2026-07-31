// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/04-переключатель-темы.решение.jsx';

// Задание про состояние: одно значение темы управляет и текстом, и классами.
describe('04 — переключатель темы', () => {
    const container_ = (container) => container.querySelector('.theme-container');

    test('сначала тема светлая', () => {
        const { container } = render(<App />);

        expect(container_(container), 'нет блока с классом «theme-container»').not.toBeNull();
        expect(container_(container)).toHaveClass('light');
        // Название темы — в <strong> строки «Текущая тема:»; в демо-тексте слово
        // «Светлая» встречается ещё раз, поэтому ищем именно этот элемент.
        expect(container.querySelector('strong')).toHaveTextContent('Светлая');
    });

    test('клик по кнопке включает тёмную тему', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(container.querySelector('.theme-toggle-button'));

        expect(container_(container)).toHaveClass('dark');
        expect(container.querySelector('strong')).toHaveTextContent('Тёмная');
    });

    test('повторный клик возвращает светлую тему', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);
        const button = container.querySelector('.theme-toggle-button');

        await user.click(button);
        await user.click(button);

        expect(container_(container)).toHaveClass('light');
        expect(container.querySelector('strong')).toHaveTextContent('Светлая');
    });

    test('иконка на кнопке меняется вместе с темой', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);
        const button = container.querySelector('.theme-toggle-button');

        expect(button).toHaveTextContent('☀️');
        await user.click(button);
        expect(container.querySelector('.theme-toggle-button')).toHaveTextContent('🌙');
    });

    test('демо-блок тоже реагирует на тему', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        expect(container.querySelector('.demo-content'), 'нет блока «demo-content»').not.toBeNull();
        expect(container.querySelector('.demo-content')).toHaveClass('light');

        await user.click(container.querySelector('.theme-toggle-button'));
        expect(container.querySelector('.demo-content')).toHaveClass('dark');
    });
});
