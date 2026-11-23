import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function CategoryChart({ subscriptions }) {
  const categoryTotals = subscriptions.reduce(
    (totals, subscription) => {
      const monthlyAmount =
        subscription.billingCycle === "Yearly"
          ? subscription.price / 12
          : subscription.price;

      totals[subscription.category] =
        (totals[subscription.category] || 0) +
        monthlyAmount;

      return totals;
    },
    {}
  );

  const chartData = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value: Math.round(value),
    })
  );

  const colors = [
    "#2563eb",
    "#7c3aed",
    "#059669",
    "#ea580c",
    "#db2777",
    "#0891b2",
  ];

  return (
    <div className="h-80">
      {chartData.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          No spending data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Monthly",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategoryChart;