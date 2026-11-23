import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Settings,
  WalletCards,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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

const secondaryItems = [
  {
    name: "Analytics",
    path: "#",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "#",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <WalletCards size={22} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            SubTrack
          </h1>

          <p className="text-xs text-slate-500">
            Subscription Manager
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}

        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Other
        </p>

        {secondaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.path}
              onClick={(event) => event.preventDefault()}
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400"
            >
              <Icon size={19} />
              {item.name}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Total subscriptions
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            12
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;