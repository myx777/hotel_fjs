// Search.tsx
import { Form, useActionData } from "react-router";

export async function action({ request }: { request: Request }) {
  // 1. Считываем данные формы
  const formData = await request.formData();
  const query = formData.get("query")?.toString() ?? "";

  // 2. Ищем в БД/API (заглушка)
  const results = await fetch(`https://api.example.com/hotels?search=${query}`)
    .then(r => r.json());

  // 3. Возвращаем результат
  return results;
}

export default function HomePage() {
  const results = useActionData() as any; // данные, вернувшиеся из action

  return (
    <div>
      <h1>Поиск гостиниц</h1>
      <Form method="post">
        <input type="text" name="query" placeholder="Введите запрос" />
        <button type="submit">Искать</button>
      </Form>

      {results && (
        <ul>
          {results.map((hotel: any) => (
            <li key={hotel.id}>{hotel.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}