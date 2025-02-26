import { Outlet } from 'react-router';
import { Footer } from '~/Layout/Footer/Footer';
import { Header } from '~/Layout/Header/Header';
import { Menu } from '~/Layout/Menu/Menu';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="max-w-[1000px] mx-auto w-full flex flex-col flex-1">
        {/* ХЕДЕР */}
        <Header />
        <div className="mt-5 mb-5 h-auto flex justify-between w-full">
          <Menu />
          {/* ОСНОВНОЙ КОНТЕНТ */}
          <main className='max-w-[705px] flex-1'>
            <Outlet /> {/* Здесь будет меняться контент */}
          </main>
        </div>

        {/* ФУТЕР */}
        <Footer />
      </div>
    </div>
  );
}
