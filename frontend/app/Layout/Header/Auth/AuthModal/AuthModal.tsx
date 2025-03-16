import { useState } from 'react';
import Button from '~/Components/Button';

/**
 * Компонент модального окна аутентификации и регистрации.
 *
 * Отображает форму для входа и регистрации пользователей. В режиме регистрации
 * предоставляется дополнительное поле для ввода имени и чекбокс для согласия с обработкой персональных данных.
 *
 * @component
 *
 * @returns {JSX.Element} Форма аутентификации или регистрации.
 */
export function AuthModal() {
  // Состояние для имени пользователя
  const [name, setName] = useState<string>('');
  // Состояние для хранения email адреса
  const [email, setEmail] = useState<string>('');
  // Состояние для хранения пароля пользователя
  const [password, setPassword] = useState<string>('');
  // Состояние для чекбокса согласия с обработкой персональных 
  // данных (используется только при регистрации).
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  // Находимся ли мы в режиме регистрации (true) или входа (false)
  const [authVariable, setAuthVariable] = useState<boolean>(false);
  // Обрабатывается ли запрос
  const [pending, setPending] = useState<boolean>(false);
  // Объект для хранения ошибок валидации формы
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  /**
   * Функция для валидации формы перед отправкой.
   *
   * Проверяет, что все обязательные поля заполнены, а при регистрации — что пользователь согласен с обработкой персональных данных.
   *
   * @returns {boolean} true, если форма валидна, иначе false.
   */
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (authVariable && !name.trim()) newErrors.name = 'Поле "Имя" обязательно для заполнения';
    if (!email.trim()) newErrors.email = 'Поле "E-mail" обязательно для заполнения';
    if (!password.trim()) newErrors.password = 'Поле "Пароль" обязательно для заполнения';
    if (authVariable && !isAgreed) newErrors.isAgreed = 'Необходимо согласие с обработкой персональных данных';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Обработчик отправки формы.
   *
   * Отправляет данные формы на сервер и обрабатывает ответ.
   *
   * @param {React.FormEvent<HTMLFormElement>} event Событие отправки формы.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setPending(true);

    const formData = authVariable ? { name, email, password } : { email, password };
    const url = authVariable ? '/api/client/register' : '/api/auth/login';
    const method = 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Ошибка при выполнении запроса');

      const data = await response.json();
      console.log(authVariable ? 'Успешная регистрация:' : 'Успешный вход:', data);
      // Здесь можно добавить редирект или обновление состояния приложения после успешного входа/регистрации
    } catch (error) {
      console.error(authVariable ? 'Ошибка регистрации:' : 'Ошибка входа:', error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="absolute right-0 top-full mt-3 w-64 p-4 bg-white border border-gray-200 rounded shadow-lg z-50">
      <div className="flex items-center justify-center gap-2 mb-3 text-sm">
        <a
          href="#"
          className={`text-blue-600 font-medium ${!authVariable ? 'text-gray-400' : ''}`}
          onClick={() => setAuthVariable(false)}
        >
          Войти
        </a>
        <span className="text-gray-400">или</span>
        <a
          href="#"
          className={`text-blue-600 font-medium ${authVariable ? 'text-gray-400' : ''}`}
          onClick={() => setAuthVariable(true)}
        >
          Зарегистрироваться
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        {authVariable && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Введите имя"
              className="mb-2 w-full border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="text-red-500 text-xs mb-2">{errors.name}</div>}
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Введите e-mail"
          className="mb-2 w-full border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="text-red-500 text-xs mb-2">{errors.email}</div>}
        <input
          type="password"
          name="password"
          placeholder="Введите пароль"
          className="mb-3 w-full border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="text-red-500 text-xs mb-2">{errors.password}</div>}
        {authVariable && (
          <div className="mb-3 flex items-center gap-2">
            <input
              type="checkbox"
              name="isAgreed"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="isAgreed" className="text-sm text-gray-600">
              Я согласен с обработкой персональных данных
            </label>
          </div>
        )}
        {errors.isAgreed && <div className="text-red-500 text-xs mb-2">{errors.isAgreed}</div>}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? (
            <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600"></div>
          ) : (
            authVariable ? 'Зарегистрироваться' : 'Войти'
          )}
        </Button>
      </form>
    </div>
  );
}
