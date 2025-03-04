import HomePage from '~/pages/Home/HomePage';
import type { Route } from './+types/Home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Hotel Reservations App' },
    { name: 'description', content: 'Welcome to Hotel Reservations!' },
  ];
}

export default function Home() {
  return <HomePage />;
}
