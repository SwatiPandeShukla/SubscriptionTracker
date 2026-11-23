import { CalendarDays } from "lucide-react";

function UpcomingRenewals({ subscriptions }) {
  const today = new Date();

  const upcoming = subscriptions
    .filter((subscription) => {
      if (subscription.status !== "Active") {
        return false;
      }

      const paymentDate = new Date(
        subscription.nextPayment
      );

      const difference =
        paymentDate.getTime() - today.getTime();

      const daysUntil =
        difference / (1000 * 60 * 60 * 24);

      return daysUntil >= 0 && daysUntil <= 30;
    })
    .sort(
      (a, b) =>
        new Date(a.nextPayment) -
        new Date(b.nextPayment)
    )
    .slice(0, 5);

  return (
    <div className="space-y-3">
      {upcoming.length === 0 ? (
        <div className="rounded-xl bg-slate-50 p-5 text-center">
          <p className="text-sm text-slate-500">
            No upcoming payments in the next 30 days.
          </p>
        </div>
      ) : (
        upcoming.map((subscription) => (
          <div
            key={subscription.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarDays size={18} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {subscription.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
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

            <p className="shrink-0 text-sm font-semibold text-slate-900">
              ₹{subscription.price.toLocaleString("en-IN")}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default UpcomingRenewals;