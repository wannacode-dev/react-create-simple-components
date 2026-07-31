// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import App from '../src/16-чат-интерфейс.решение.jsx';

// Задание: отправка сообщения, индикатор «печатает…» и отложенный ответ бота.
// Ответ приходит через setTimeout, поэтому время в тесте фальшивое — иначе
// пришлось бы ждать полторы секунды на каждый прогон.
describe('16 — чат-интерфейс', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        // scrollIntoView в jsdom не реализован, а компонент зовёт его на каждое
        // новое сообщение.
        Element.prototype.scrollIntoView = vi.fn();
    });
    afterEach(() => vi.useRealTimers());

    // Индикатор «печатает…» рисуется такой же строкой .message — из списка
    // сообщений его убираем, иначе он считался бы ответом бота.
    const messages = (container) =>
        [...container.querySelectorAll('.chat-messages .message')].filter(
            (m) => !m.querySelector('.typing-indicator'),
        );
    const input = (container) => container.querySelector('.chat-input');

    const send = (container, text) => {
        fireEvent.change(input(container), { target: { value: text } });
        fireEvent.click(container.querySelector('.send-button'));
    };

    const waitForBot = async () => {
        await act(async () => {
            vi.advanceTimersByTime(2000);
        });
    };

    test('стартовая переписка на месте', () => {
        const { container } = render(<App />);

        expect(messages(container)).toHaveLength(3);
        expect(screen.getByText('Привет! Как дела?')).toBeInTheDocument();
    });

    test('свои и чужие сообщения различаются', () => {
        const { container } = render(<App />);

        expect(messages(container)[0]).toHaveClass('received');
        expect(messages(container)[1]).toHaveClass('sent');
    });

    test('пустое сообщение отправить нельзя', () => {
        const { container } = render(<App />);

        expect(container.querySelector('.send-button')).toBeDisabled();
    });

    test('сообщение отправляется и поле очищается', () => {
        const { container } = render(<App />);

        send(container, 'Привет!');

        expect(messages(container)[3]).toHaveTextContent('Привет!');
        expect(messages(container)[3]).toHaveClass('sent');
        expect(input(container)).toHaveValue('');
    });

    test('пока бот думает — виден индикатор «печатает…»', () => {
        const { container } = render(<App />);

        send(container, 'Привет!');

        expect(
            container.querySelector('.typing-indicator'),
            'нет индикатора «typing-indicator»',
        ).not.toBeNull();
    });

    test('бот отвечает с задержкой', async () => {
        const { container } = render(<App />);

        send(container, 'Привет!');
        expect(messages(container)).toHaveLength(4);

        await waitForBot();

        expect(messages(container)).toHaveLength(5);
        expect(messages(container)[4]).toHaveClass('received');
    });

    test('после ответа индикатор пропадает', async () => {
        const { container } = render(<App />);

        send(container, 'Привет!');
        await waitForBot();

        expect(container.querySelector('.typing-indicator')).toBeNull();
    });

    test('у каждого сообщения есть время', () => {
        const { container } = render(<App />);

        send(container, 'Привет!');

        expect(messages(container)[3].querySelector('.message-time').textContent).toMatch(/\d{2}:\d{2}/);
    });
});
