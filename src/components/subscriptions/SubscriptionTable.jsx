import { Pencil, Trash2, X } from "lucide-react";

function SubscriptionTable({
  subscriptions,
  onEdit,
  onDelete,
  onCancel,
}) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Subscription
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Price
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Billing
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Next payment
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {subscriptions.map((subscription) => (
              <tr
                key={subscription.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">
                    {subscription.name}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {subscription.category}
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">
                    ₹{subscription.price.toLocaleString("en-IN")}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {subscription.billingCycle}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(
                    subscription.nextPayment
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      subscription.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(subscription)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      aria-label={`Edit ${subscription.name}`}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(subscription)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${subscription.name}`}
                    >
                      <Trash2 size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onCancel(subscription)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                      aria-label={`Cancel ${subscription.name}`}
                    >
                      <X size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionTable;