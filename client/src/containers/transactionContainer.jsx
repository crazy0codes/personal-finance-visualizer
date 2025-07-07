import { useState, useEffect } from "react"
import { toast } from "sonner"
import { TransactionView } from "../views/transactionView"
const apiUrl = import.meta.env.VITE_API_URL;

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

export default function TransactionsContainer() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const [formData, setFormData] = useState({
    money: "",
    date: "",
    description: "",
    category: "",
  })

  useEffect(() => {
    fetchTransactions()
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/transaction`)
      console.log(response)
      if (response.ok) {
        const data = await response.json()
        setTransactions(data.transactions || [])
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch transactions")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.money || !formData.date || !formData.description || !formData.category) {
      toast.error("All fields are required")
      return
    }

    try {

      const url = editingTransaction
        ? `${apiUrl}/api/transaction/update/${editingTransaction._id}`
        : `${apiUrl}/api/transaction/add`

      const method = editingTransaction ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          money: Number.parseFloat(formData.money),
          date: formData.date,
          description: formData.description,
          category: formData.category,
        }),
      })

      console.log(response)

      if (response.ok) {
        toast.success(editingTransaction ? "Transaction updated successfully" : "Transaction added successfully")
        setIsDialogOpen(false)
        resetForm()
        fetchTransactions()
      } else {
        const error = await response.json()
        console.log(error)
        toast.error(error.message || "Failed to save transaction")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to save transaction")
    }
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setFormData({
      money: transaction.money.toString(),
      date: transaction.date.split("T")[0],
      description: transaction.description,
      category: transaction.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return

    try {
      const response = await fetch(`${apiUrl}/api/transaction/delete/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Transaction deleted successfully")
        fetchTransactions()
      } else {
        toast.error("Failed to delete transaction")
      }
    } catch (error) {
      toast.error("Failed to delete transaction")
    }
  }

  const resetForm = () => {
    setFormData({
      money: "",
      date: "",
      description: "",
      category: "",
    })
    setEditingTransaction(null)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <TransactionView
  isDialogOpen={isDialogOpen}
  setIsDialogOpen={setIsDialogOpen}
  resetForm={resetForm}
  editingTransaction={editingTransaction}
  handleDelete={handleDelete}
  handleEdit={handleEdit}
  handleSubmit={handleSubmit}
  setFormData={setFormData}
  formData={formData}
  categories={categories}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  filterCategory={filterCategory}
  setFilterCategory={setFilterCategory}
  filteredTransactions={filteredTransactions}
  />
}
