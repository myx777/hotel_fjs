import { useState } from 'react';
import Button from '~/Components/Button';

export function LogIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
  
    const formData = {
      name,
      password,
    };
  
    try {
      const response = await fetch(`http://server:${process.env.BACKEND_PORT}/users/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }
  
      const data = await response.json();
      console.log('Успешная регистрация:', data);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="absolute right-0 top-full mt-3 w-64 p-4 bg-white border border-gray-200 rounded shadow-lg z-50">
      {/* Верхняя строка: "Войти" или "Зарегистрироваться" */}
      <div className="flex items-center justify-center gap-2 mb-3 text-sm">
        <a href="#" className="text-blue-600 font-medium">
          Войти
        </a>
        <span className="text-gray-400">или</span>
        <a href="#" className="text-blue-600 font-medium">
          Зарегистрироваться
        </a>
      </div>

      {/* Поля ввода */}
      <form onSubmit={login}>
        <input
          type="text"
          name="name"  // Добавим атрибут name для каждого поля
          placeholder="Введите логин"
          className="mb-2 w-full border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          name="password" // Добавим атрибут name для каждого поля
          placeholder="Введите пароль"
          className="mb-3 w-full border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Кнопка "Войти" */}
        <Button type="submit" disabled={pending}>
          {pending ? (
            <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600"></div>
          ) : (
            'Войти'
          )}
        </Button>
      </form>
    </div>
  );
}
