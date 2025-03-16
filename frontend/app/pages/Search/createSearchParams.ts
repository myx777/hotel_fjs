
export function createSearchParams(data: FormData) {
  const params = new URLSearchParams();
  
  const query = data.get('query')?.toString();
  if (query) params.set('query', query);
  
  const checkIn = data.get('checkIn')?.toString();
  if (checkIn) params.set('checkIn', checkIn);
  
  const checkOut = data.get('checkOut')?.toString();
  if (checkOut) params.set('checkOut', checkOut);
  
  return params;
}