import { useState, useEffect } from "react"
import { AnalyticsView } from "../views/AnalyticsView"
const apiUrl = import.meta.env.VITE_API_URL;



export default function AnalyticsContainer() {
    const [transactions, setTransactions] = useState([])
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

    useEffect(() => {
        fetchData()
    }, [selectedMonth])

    const fetchData = async () => {
        try {
            const [transactionsRes, budgetsRes] = await Promise.all([
                fetch(`${apiUrl}/api/transaction`),
                fetch(`${apiUrl}/api/budgets?month=${selectedMonth}`),
            ])

            if (transactionsRes.ok) {
                const transactionsData = await transactionsRes.json()
                setTransactions(transactionsData.transactions || [])
            }

            if (budgetsRes.ok) {
                const budgetsData = await budgetsRes.json()
                setBudgets(budgetsData.budgets || [])
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    const getSpendingInsights = () => {
        const currentMonth = new Date(selectedMonth)
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

        const monthlyTransactions = transactions.filter((t) => {
            const transactionDate = new Date(t.date)
            return transactionDate >= monthStart && transactionDate <= monthEnd
        })

        const totalSpent = monthlyTransactions.filter((t) => t.money < 0).reduce((sum, t) => sum + Math.abs(t.money), 0)

        const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0)

        const categorySpending = monthlyTransactions
            .filter((t) => t.money < 0)
            .reduce(
                (acc, t) => {
                    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.money)
                    return acc
                },
                {}
            )

        const topCategory = Object.entries(categorySpending).sort(([, a], [, b]) => b - a)[0]

        const budgetStatus = budgets.map((budget) => {
            const spent = categorySpending[budget.category] || 0
            const percentage = (spent / budget.budget) * 100
            return {
                category: budget.category,
                spent,
                budget: budget.budget,
                percentage,
                status: percentage > 100 ? "over" : percentage > 80 ? "warning" : "good",
            }
        })

        const overBudgetCategories = budgetStatus.filter((b) => b.status === "over")
        const warningCategories = budgetStatus.filter((b) => b.status === "warning")

        return {
            totalSpent,
            totalBudget,
            budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
            topCategory,
            overBudgetCategories,
            warningCategories,
            transactionCount: monthlyTransactions.length,
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        )
    }

    const insights = getSpendingInsights()

    return (
        <AnalyticsView
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            insights={insights}
            transactions={transactions}
            budgets={budgets}
        />
    )
}
