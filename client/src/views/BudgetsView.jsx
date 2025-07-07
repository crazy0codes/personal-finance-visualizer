
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Plus, Target, TrendingUp, TrendingDown } from "lucide-react"


export function BudgetsView(
    {
        selectedMonth,
        setSelectedMonth,
        isDialogOpen,
        setIsDialogOpen,
        formData,
        resetForm,
        handleSubmit,
        categories,
        setFormData,
        budgets,
        getBudgetStatus
    }
) {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
                <div className="flex items-center gap-4">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                                const date = new Date()
                                date.setMonth(date.getMonth() - 6 + i)
                                const value = date.toISOString().slice(0, 7)
                                const label = date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
                                return (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Budget
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Budget</DialogTitle>
                                <DialogDescription>Set a spending limit for a category this month.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="category" className="text-right">
                                            Category
                                        </Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="budget" className="text-right">
                                            Budget
                                        </Label>
                                        <Input
                                            id="budget"
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter budget amount"
                                            className="col-span-3"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="month" className="text-right">
                                            Month
                                        </Label>
                                        <Input
                                            id="month"
                                            type="month"
                                            className="col-span-3"
                                            value={formData.month}
                                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Add Budget</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {budgets.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Target className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No budgets set</h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Start by setting budgets for your spending categories to track your financial goals.
                        </p>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Your First Budget
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {budgets.map((budget) => {
                        const status = getBudgetStatus(budget)
                        return (
                            <Card key={`${budget.category}-${budget.month}`}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{budget.category}</CardTitle>
                                    {status.status === "over" ? (
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold mb-2">${budget.budget.toLocaleString()}</div>
                                    <Progress
                                        value={status.percentage}
                                        className={`w-full mb-2 ${status.status === "over"
                                            ? "bg-red-100"
                                            : status.status === "warning"
                                                ? "bg-yellow-100"
                                                : "bg-green-100"
                                            }`}
                                    />
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Spent: ${status.spent.toLocaleString()}</span>
                                        <span className={status.remaining < 0 ? "text-red-500" : "text-green-500"}>
                                            {status.remaining < 0 ? "Over by: " : "Remaining: "}${Math.abs(status.remaining).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${status.status === "over"
                                                ? "bg-red-100 text-red-800"
                                                : status.status === "warning"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {status.percentage.toFixed(1)}% used
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}