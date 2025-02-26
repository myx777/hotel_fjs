export function Menu() {
  return (
    <aside className="w-fit h-fit rounded bg-white p-9 shadow-sm">
      <nav>
        <ul className="text-[#8A92A6] font-semibold text-base tracking-normal leading-[1.21] space-y-3">
          <li className="flex items-center">
            <span className="mr-2 text-lg">&gt;</span>
            <a href="/">Все гостиницы</a>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-lg">&gt;</span>
            <a href="/">Поиск номера</a>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-lg">&gt;</span>
            <a href="/">Добавить гостиницу</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}