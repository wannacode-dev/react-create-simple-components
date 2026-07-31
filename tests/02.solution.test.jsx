// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/02-карточка-профиля.решение.jsx';

// Задание про пропсы: один компонент карточки, три разных набора данных.
describe('02 — карточка профиля', () => {
    test('на странице три карточки профиля', () => {
        const { container } = render(<App />);

        expect(container.querySelectorAll('.profile-card')).toHaveLength(3);
    });

    test('у каждой карточки свой аватар', () => {
        const { container } = render(<App />);
        const avatars = [...container.querySelectorAll('.profile-avatar')].map((a) =>
            a.textContent.trim(),
        );

        expect(avatars).toHaveLength(3);
        expect(avatars.every((a) => a !== '')).toBe(true);
        expect(new Set(avatars).size, 'аватары у всех одинаковые — пропсы не работают').toBe(3);
    });

    test('имена приходят из пропсов и все разные', () => {
        const { container } = render(<App />);
        const names = [...container.querySelectorAll('.profile-name')].map((n) =>
            n.textContent.trim(),
        );

        expect(names).toHaveLength(3);
        expect(new Set(names).size, 'имена у всех одинаковые — пропсы не работают').toBe(3);
    });

    test('у каждой карточки своё описание', () => {
        const { container } = render(<App />);
        const bios = [...container.querySelectorAll('.profile-bio')].map((b) => b.textContent.trim());

        expect(bios).toHaveLength(3);
        expect(bios.every((b) => b !== '')).toBe(true);
    });

    test('в карточке два счётчика: подписчики и подписки', () => {
        const { container } = render(<App />);
        const first = container.querySelector('.profile-card');

        expect(first.querySelectorAll('.stat-item')).toHaveLength(2);
        expect(first).toHaveTextContent('Подписчики');
        expect(first).toHaveTextContent('Подписки');
    });

    test('счётчики показывают числа', () => {
        const { container } = render(<App />);
        const values = [...container.querySelectorAll('.stat-value')].map((v) =>
            v.textContent.replace(/\s| /g, ''),
        );

        expect(values.length).toBeGreaterThanOrEqual(6);
        expect(values.every((v) => /^\d+$/.test(v)), 'в счётчиках не числа').toBe(true);
    });

    test('заголовок страницы на месте', () => {
        render(<App />);

        expect(screen.getByText(/Наша команда/)).toBeInTheDocument();
    });
});
