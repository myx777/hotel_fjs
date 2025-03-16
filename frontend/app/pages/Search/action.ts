import { createSearchParams } from "./createSearchParams";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const searchParams = createSearchParams(formData);
    
    const response = await fetch(`https://api.example.com/hotels?${searchParams}`);
    
    if (!response.ok) throw new Error('Ошибка поиска');
    return response.json();
  }