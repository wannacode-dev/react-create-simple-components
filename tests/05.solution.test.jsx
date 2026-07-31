// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/05-аккордеон.решение.jsx';

// Задание: у каждой секции аккордеона СВОЁ состояние — открытие одной не
// трогает соседние.
describe('05 — аккордеон', () => {
    const headers = (container) => container.querySelectorAll('.accordion-header');

    test('секций несколько', () => {
        const { container } = render(<App />);

        expect(container.querySelectorAll('.accordion-item').length).toBeGreaterThanOrEqual(3);
    });

    test('сначала все секции закрыты', () => {
        const { container } = render(<App />);

        expect(container.querySelectorAll('.accordion-content')).toHaveLength(0);
    });

    test('клик по заголовку раскрывает секцию', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(headers(container)[0]);

        expect(container.querySelectorAll('.accordion-content')).toHaveLength(1);
        expect(headers(container)[0]).toHaveClass('open');
    });

    test('повторный клик закрывает секцию', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(headers(container)[0]);
        await user.click(headers(container)[0]);

        expect(container.querySelectorAll('.accordion-content')).toHaveLength(0);
    });

    test('секции независимы: открытая остаётся открытой', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(headers(container)[0]);
        await user.click(headers(container)[1]);

        expect(
            container.querySelectorAll('.accordion-content'),
            'открытие второй секции закрыло первую — состояние общее, а должно быть у каждой своё',
        ).toHaveLength(2);
    });

    test('иконка показывает состояние секции', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        expect(container.querySelectorAll('.accordion-icon')[0]).toHaveTextContent('▶');
        await user.click(headers(container)[0]);
        expect(container.querySelectorAll('.accordion-icon')[0]).toHaveTextContent('▼');
    });

    test('заголовок страницы на месте', () => {
        render(<App />);

        expect(screen.getByText(/Часто задаваемые вопросы/)).toBeInTheDocument();
    });
});
