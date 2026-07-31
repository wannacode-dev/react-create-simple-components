// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/06-табы.решение.jsx';

// Задание: одно состояние activeTab выбирает и подсвеченную кнопку, и то,
// какой блок контента показан.
describe('06 — табы', () => {
    const buttons = (container) => container.querySelectorAll('.tab-button');

    test('три кнопки табов', () => {
        const { container } = render(<App />);

        expect(buttons(container)).toHaveLength(3);
    });

    test('сначала активен первый таб', () => {
        const { container } = render(<App />);

        expect(container.querySelectorAll('.tab-button.active')).toHaveLength(1);
        expect(buttons(container)[0]).toHaveClass('active');
    });

    test('сначала показан контент профиля', () => {
        render(<App />);

        expect(screen.getByText(/ivan@example\.com/)).toBeInTheDocument();
    });

    test('клик по табу «Посты» показывает посты', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(buttons(container)[1]);

        expect(container.querySelectorAll('.post-item').length).toBeGreaterThanOrEqual(3);
        expect(screen.queryByText(/ivan@example\.com/), 'контент профиля не спрятали').toBeNull();
    });

    test('активная кнопка переезжает вместе с табом', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(buttons(container)[1]);

        expect(container.querySelectorAll('.tab-button.active')).toHaveLength(1);
        expect(buttons(container)[1]).toHaveClass('active');
    });

    test('клик по табу «Настройки» показывает настройки', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(buttons(container)[2]);

        expect(container.querySelectorAll('.settings-section').length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole('button', { name: /Сохранить настройки/ })).toBeInTheDocument();
    });

    test('можно вернуться на первый таб', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(buttons(container)[2]);
        await user.click(buttons(container)[0]);

        expect(screen.getByText(/ivan@example\.com/)).toBeInTheDocument();
        expect(buttons(container)[0]).toHaveClass('active');
    });
});
