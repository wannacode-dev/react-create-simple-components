import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/07-модальное-окно.проблема.jsx';

// Задание: модалка рисуется по флагу и закрывается тремя способами — крестиком,
// кнопкой и кликом по затемнённому фону (но не по самому окну).
describe('07 — модальное окно', () => {
    const openIt = async (user, container) => {
        await user.click(container.querySelector('.open-modal-button'));
    };

    test('сначала модального окна нет', () => {
        const { container } = render(<App />);

        expect(container.querySelector('.modal-overlay')).toBeNull();
    });

    test('кнопка открывает модальное окно', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await openIt(user, container);

        expect(container.querySelector('.modal-overlay'), 'модалка не открылась').not.toBeNull();
        expect(screen.getByText(/Поздравляем/)).toBeInTheDocument();
    });

    test('крестик закрывает окно', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await openIt(user, container);
        await user.click(container.querySelector('.modal-close'));

        expect(container.querySelector('.modal-overlay')).toBeNull();
    });

    test('кнопка «Закрыть окно» закрывает окно', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await openIt(user, container);
        await user.click(container.querySelector('.modal-close-button'));

        expect(container.querySelector('.modal-overlay')).toBeNull();
    });

    test('клик по затемнённому фону закрывает окно', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await openIt(user, container);
        await user.click(container.querySelector('.modal-overlay'));

        expect(container.querySelector('.modal-overlay')).toBeNull();
    });

    test('клик по самому окну его НЕ закрывает', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await openIt(user, container);
        await user.click(container.querySelector('.modal-content'));

        expect(
            container.querySelector('.modal-overlay'),
            'клик внутри окна закрыл его — не остановили всплытие события',
        ).not.toBeNull();
    });

    test('окно можно открыть повторно', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await openIt(user, container);
        await user.click(container.querySelector('.modal-close'));
        await openIt(user, container);

        expect(container.querySelector('.modal-overlay')).not.toBeNull();
    });
});
