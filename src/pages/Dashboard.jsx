import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  IndianRupee,
  TrendingUp,
  CalendarClock,
} from "lucide-react";

import { getSubscriptions } from "../api/subscriptionService";
import CategoryChart from "../components/dashboard/CategoryChart";
import UpcomingRenewals from "../components/dashboard/UpcomingRenewals";

function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const loadSubscriptions = async () => {
    try {
      const data = await getSubscriptions();

      setSubscriptions(data);
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong while loading subscriptions."
      );
    } finally {
      setLoading(false);
    }
  };

  loadSubscriptions();
}, []);

  const activeSubscriptions = useMemo(
    () =>
      subscriptions.filter(
        (subscription) =>
          subscription.status === "Active"
      ),
    [subscriptions]
  );

  const monthlySpending = useMemo(() => {
    return activeSubscriptions.reduce(
      (total, subscription) => {
        if (
          subscription.billingCycle === "Yearly"
        ) {
          return total + subscription.price / 12;
        }

        return total + subscription.price;
      },
      0
    );
  }, [activeSubscriptions]);

  const yearlySpending = monthlySpending * 12;

  const upcomingPayments = useMemo(() => {
    const today = new Date();

    return activeSubscriptions.filter((subscription) => {
      const paymentDate = new Date(
        subscription.nextPayment
      );

      const difference =
        paymentDate.getTime() - today.getTime();

      const daysUntil =
        difference / (1000 * 60 * 60 * 24);

      return daysUntil >= 0 && daysUntil <= 30;
    });
  }, [activeSubscriptions]);

  if (loading) {
    return (
      <section>
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </section>
    );
  }
  if (error) {
  return (
    <section>
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-lg font-semibold text-red-800">
          Unable to load dashboard
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      </div>
    </section>
  );
}
  return (
    <section>
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Overview
        </p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Good morning 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Here's an overview of your subscriptions and spending.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Monthly spending"
          value={`₹${Math.round(
            monthlySpending
          ).toLocaleString("en-IN")}`}
          icon={IndianRupee}
        />

        <SummaryCard
          title="Yearly spending"
          value={`₹${Math.round(
            yearlySpending
          ).toLocaleString("en-IN")}`}
          icon={TrendingUp}
        />

        <SummaryCard
          title="Active subscriptions"
          value={activeSubscriptions.length}
          icon={CreditCard}
        />

        <SummaryCard
          title="Upcoming payments"
          value={upcomingPayments.length}
          icon={CalendarClock}
        />
      </div>

      {/* Charts and renewals */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Spending by category
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Estimated monthly spending across your active subscriptions.
            </p>
          </div>

          <div className="mt-4">
            <CategoryChart
              subscriptions={activeSubscriptions}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Upcoming renewals
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Payments due within the next 30 days.
            </p>
          </div>

          <div className="mt-5">
            <UpcomingRenewals
              subscriptions={activeSubscriptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;