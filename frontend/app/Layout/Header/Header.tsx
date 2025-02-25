import { Auth } from './Auth/Auth';
import { Logo } from './Logo/Logo';

export function Header() {
  return (
    <header className="h-auto flex justify-between w-full ">
      <Logo />
      <div className="max-w-[705px] h-auto grow bg-white rounded justify-end flex items-center justify-center shadow-sm">
        <Auth />
      </div>
    </header>
  ); 
}
