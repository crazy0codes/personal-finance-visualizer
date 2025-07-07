
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"


export function BudgetComparisonChart({ transactions, budgets }) {
  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthStart = new Date(currentMonth + "-01")
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)

  const chartData = budgets.map((budget) => {
    const spent = transactions
      .filter((t) => {
        const transactionDate = new Date(t.date)
        return (
          t.category === budget.category && t.money < 0 && transactionDate >= monthStart && transactionDate <= monthEnd
        )
      })
      .reduce((sum, t) => sum + Math.abs(t.money), 0)

    return {
      category: budget.category,
      budget: budget.limit,
      spent: spent,
    }
  })

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">No budget data available</div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [
            `$${value.toLocaleString()}`,
            name === "budget" ? "Budget" : "Spent",
          ]}
        />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" name="Budget" />
        <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
      </BarChart>
    </ResponsiveContainer>
  )
}
