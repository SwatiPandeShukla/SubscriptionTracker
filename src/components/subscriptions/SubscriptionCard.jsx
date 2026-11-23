import { Pencil, Trash2, X } from "lucide-react";

function SubscriptionCard({
  subscription,
  onEdit,
  onDelete,
  onCancel,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            {subscription.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {subscription.category}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            subscription.status === "Active"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {subscription.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400">
            Price
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            ₹{subscription.price.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Billing
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {subscription.billingCycle}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Next payment
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {new Date(
              subscription.nextPayment
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onEdit(subscription)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(subscription)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete
        </button>

        <button
          type="button"
          onClick={() => onCancel(subscription)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-100 px-4 py-2.5 text-sm font-medium text-amber-600 hover:bg-amber-50"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SubscriptionCard;