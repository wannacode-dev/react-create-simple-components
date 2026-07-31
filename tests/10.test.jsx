import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/10-форма-контакта.проблема.jsx';

// Задание: контролируемая форма с валидацией — ошибки появляются при отправке,
// пропадают при исправлении, а после успешной отправки форма сменяется
// сообщением об успехе.
describe('10 — форма контакта', () => {
    const errors = (container) => container.querySelectorAll('.error-message');

    const fillValid = async (user) => {
        await user.type(screen.getByPlaceholderText('Иван Иванов'), 'Пётр');
        await user.type(screen.getByPlaceholderText('ivan@example.com'), 'petr@example.com');
        await user.type(screen.getByPlaceholderText(/\+7/), '+7 999 000-00-00');
        await user.type(screen.getByPlaceholderText(/Расскажите подробнее/), 'Сообщение подлиннее');
        await user.click(screen.getByRole('checkbox'));
    };

    test('сначала ошибок нет', () => {
        const { container } = render(<App />);

        expect(errors(container)).toHaveLength(0);
    });

    test('отправка пустой формы показывает ошибки', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByRole('button', { name: /Отправить сообщение/ }));

        expect(errors(container).length, 'валидация не сработала').toBeGreaterThanOrEqual(5);
    });

    test('email без домена не проходит проверку', async () => {
        const user = userEvent.setup();
        render(<App />);

        // Именно «petr@example», а не «не-почта»: строку совсем без собачки
        // забракует сам браузер (input type="email") и до нашей проверки дело не
        // дойдёт — ни в jsdom, ни в реальном браузере.
        await user.type(screen.getByPlaceholderText('ivan@example.com'), 'petr@example');
        await user.click(screen.getByRole('button', { name: /Отправить сообщение/ }));

        expect(screen.getByText(/корректный email/i)).toBeInTheDocument();
    });

    test('слишком короткое сообщение не проходит', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.type(screen.getByPlaceholderText(/Расскажите подробнее/), 'коротко');
        await user.click(screen.getByRole('button', { name: /Отправить сообщение/ }));

        expect(screen.getByText(/минимум 10 символов/i)).toBeInTheDocument();
    });

    test('ошибка поля пропадает, когда его исправили', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole('button', { name: /Отправить сообщение/ }));
        expect(screen.getByText(/Имя обязательно/i)).toBeInTheDocument();

        await user.type(screen.getByPlaceholderText('Иван Иванов'), 'Пётр');
        expect(screen.queryByText(/Имя обязательно/i)).toBeNull();
    });

    test('без согласия форма не отправляется', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.type(screen.getByPlaceholderText('Иван Иванов'), 'Пётр');
        await user.type(screen.getByPlaceholderText('ivan@example.com'), 'petr@example.com');
        await user.type(screen.getByPlaceholderText(/\+7/), '+7 999 000-00-00');
        await user.type(screen.getByPlaceholderText(/Расскажите подробнее/), 'Сообщение подлиннее');
        await user.click(screen.getByRole('button', { name: /Отправить сообщение/ }));

        expect(screen.getByText(/согласие на обработку/i)).toBeInTheDocument();
    });

    test('заполненная форма отправляется и показывает благодарность', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await fillValid(user);
        await user.click(screen.getByRole('button', { name: /Отправить сообщение/ }));

        expect(container.querySelector('.success-message'), 'нет блока «success-message»').not.toBeNull();
        expect(screen.getByText(/Спасибо за ваше сообщение/)).toBeInTheDocument();
    });

    test('в благодарности показаны введённые данные', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await fillValid(user);
        await user.click(screen.getByRole('button', { name: /Отправить сообщение/ }));

        const success = container.querySelector('.success-message');
        expect(success).toHaveTextContent('Пётр');
        expect(success).toHaveTextContent('petr@example.com');
    });
});
