// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/08-todo-list.решение.jsx';

// Задание: список задач с добавлением, отметкой и удалением плюс статистика.
describe('08 — todo list', () => {
    const items = (container) => container.querySelectorAll('.todo-item');

    test('стартовые задачи на месте', () => {
        const { container } = render(<App />);

        expect(items(container)).toHaveLength(3);
        expect(screen.getByText('Изучить React')).toBeInTheDocument();
    });

    test('новая задача добавляется и поле очищается', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);
        const input = container.querySelector('.todo-input');

        await user.type(input, 'Написать тест');
        await user.click(container.querySelector('.add-button'));

        expect(items(container)).toHaveLength(4);
        expect(screen.getByText('Написать тест')).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    test('пустую задачу добавить нельзя', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.type(container.querySelector('.todo-input'), '   ');
        await user.click(container.querySelector('.add-button'));

        expect(items(container)).toHaveLength(3);
    });

    test('Enter тоже добавляет задачу', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.type(container.querySelector('.todo-input'), 'Через Enter{Enter}');

        expect(items(container)).toHaveLength(4);
    });

    test('чекбокс зачёркивает задачу', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(container.querySelectorAll('.todo-checkbox')[0]);

        expect(container.querySelectorAll('.todo-text')[0]).toHaveClass('completed');
    });

    test('кнопка удаляет задачу', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(container.querySelectorAll('.delete-button')[0]);

        expect(items(container)).toHaveLength(2);
        expect(screen.queryByText('Изучить React')).toBeNull();
    });

    test('статистика считает выполненные', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);
        const stats = () => container.querySelector('.todo-stats');

        expect(stats(), 'нет блока статистики «todo-stats»').not.toBeNull();
        expect(stats().textContent.replace(/\s+/g, ' ')).toMatch(/Выполнено:\s*0\s*из\s*3/);

        await user.click(container.querySelectorAll('.todo-checkbox')[0]);
        expect(stats().textContent.replace(/\s+/g, ' ')).toMatch(/Выполнено:\s*1\s*из\s*3/);
    });

    test('когда задач не осталось — заглушка вместо списка', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        for (let i = 0; i < 3; i++) {
            await user.click(container.querySelectorAll('.delete-button')[0]);
        }

        expect(container.querySelector('.empty-state'), 'нет блока «empty-state»').not.toBeNull();
        expect(container.querySelector('.todo-stats')).toBeNull();
    });
});
