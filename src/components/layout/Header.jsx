import { Bell, Search } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between gap-4 px-4 pl-16 sm:px-6 sm:pl-16 lg:px-8 lg:pl-8">  <div className="relative hidden w-full max-w-md sm:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            placeholder="Search subscriptions..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              SS
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">
                User
              </p>

              <p className="text-xs text-slate-500">
                Account
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;