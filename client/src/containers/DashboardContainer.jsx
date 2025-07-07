
import { useState, useEffect } from "react"
import { DashboardView } from "../views/DashboardView.jsx"

export default function DashbaordContainer() {
    const [transactions, setTransactions] = useState([])
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [transactionsRes, budgetsRes] = await Promise.all([
                fetch(`${process.env.REACT_APP_API_URL}/api/transaction`),
                fetch(`${process.env.REACT_APP_API_URL}/api/budgets?month=${new Date().toISOString().slice(0, 7)}`),
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

    const totalIncome = transactions.filter((t) => t.money > 0).reduce((sum, t) => sum + t.money, 0)

    const totalExpenses = transactions.filter((t) => t.money < 0).reduce((sum, t) => sum + Math.abs(t.money), 0)

    const netBalance = totalIncome - totalExpenses

    const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <DashboardView
            transactions={transactions}
            totalIncome={totalIncome}
            totalBudget={totalBudget}
            totalExpenses={totalExpenses}
            netBalance={netBalance}
            budgets={budgets}
        />
    )
}
