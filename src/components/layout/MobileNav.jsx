import {
  CreditCard,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function MobileNav() {
  const [open, setOpen] = useState(false);

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Subscriptions",
      path: "/subscriptions",
      icon: CreditCard,
    },
  ];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setOpen(false)}
          />

          <aside className="relative h-full w-72 bg-white shadow-xl">
            <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  SubTrack
                </h1>

                <p className="text-xs text-slate-500">
                  Subscription Manager
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2 p-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-100"
                      }`
                    }
                  >
                    <Icon size={19} />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}

export default MobileNav;