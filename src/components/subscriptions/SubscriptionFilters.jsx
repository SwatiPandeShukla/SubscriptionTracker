import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

function SubscriptionFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  status,
  setStatus,
  billingCycle,
  setBillingCycle,
  sortBy,
  setSortBy,
  onReset,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-slate-500" />
          <h3 className="font-semibold text-slate-900">Filters</h3>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search subscriptions..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All categories</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Music">Music</option>
          <option value="Shopping">Shopping</option>
          <option value="Productivity">Productivity</option>
          <option value="Cloud Storage">Cloud Storage</option>
          <option value="Education">Education</option>
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>

        <select
          value={billingCycle}
          onChange={(event) => setBillingCycle(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All billing cycles</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        >
          <option value="name">Sort by name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="next-payment">Next payment</option>
        </select>
      </div>
    </div>
  );
}

export default SubscriptionFilters;