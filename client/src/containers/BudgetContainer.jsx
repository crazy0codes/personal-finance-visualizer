
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { BudgetsView } from "../views/BudgetsView"
import process from "process"


const categories = [
  "Groceries",
  "Bills",
  "Subscriptions",
  "Travel",
  "Medical",
  "Gifts",
  "Education",
  "Savings",
  "other",
]

export default function BudgetsContainer() {
  const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  const [formData, setFormData] = useState({
    category: "",
    budget: "",
    month: selectedMonth,
  })

  useEffect(() => {
    fetchData()
  }, [selectedMonth])

  const fetchData = async () => {
    try {
      const [budgetsRes, transactionsRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/api/budgets?month=${selectedMonth}`),
        fetch(`${process.env.REACT_APP_API_URL}/api/transaction`),
      ])

      if (budgetsRes.ok) {
        const budgetsData = await budgetsRes.json()
        setBudgets(budgetsData.budgets || [])
      }

      if (transactionsRes.ok) {
        const transactionsData = await transactionsRes.json()
        setTransactions(transactionsData.transactions || [])
      }
    } catch (error) {
      toast.error("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.category || !formData.budget || !formData.month) {
      toast.error("All fields are required")
      return
    }

    try {
      const response = await fetch("${process.env.REACT_APP_API_URL}/api/budgets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: formData.category,
          budget: Number.parseFloat(formData.budget),
          month: formData.month,
        }),
      })

      if (response.ok) {
        toast.success("Budget added successfully")
        setIsDialogOpen(false)
        resetForm()
        fetchData()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to add budget")
      }
    } catch (error) {
      toast.error("Failed to add budget")
    }
  }

  const resetForm = () => {
    setFormData({
      category: "",
      budget: "",
      month: selectedMonth,
    })
  }

  const getSpentAmount = (category) => {
    const monthStart = new Date(selectedMonth + "-01")
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)

    return transactions
      .filter((t) => {
        const transactionDate = new Date(t.date)
        return t.category === category && t.money < 0 && transactionDate >= monthStart && transactionDate <= monthEnd
      })
      .reduce((sum, t) => sum + Math.abs(t.money), 0)
  }

  const getBudgetStatus = (Budget) => {
    const spent = getSpentAmount(Budget.category)
    const percentage = (spent / Budget.budget) * 100
    const remaining = Budget.budget - spent

    return {
      spent,
      percentage: Math.min(percentage, 100),
      remaining,
      status: percentage > 100 ? "over" : percentage > 80 ? "warning" : "good",
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <BudgetsView 
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        formData={formData}
        resetForm={resetForm}
        handleSubmit={handleSubmit}
        categories={categories}
        setFormData={setFormData}
        budgets={budgets}
        getBudgetStatus={getBudgetStatus}
  />
}
