
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function MonthlyExpensesChart({ transactions }) {
  const monthlyData = transactions
    .filter((t) => t.money < 0)
    .reduce(
      (acc, transaction) => {
        const month = new Date(transaction.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })

        if (!acc[month]) {
          acc[month] = 0
        }
        acc[month] += Math.abs(transaction.money)
        return acc
      },
      {}
    )

  const chartData = Object.entries(monthlyData)
    .map(([month, amount]) => ({
      month,
      amount,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .slice(-6) // Last 6 months

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Expenses"]} />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
