import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react"
import { MonthlyExpensesChart } from "@/components/monthly-expenses-chart"
import { CategoryPieChart } from "@/components/category-pie-chart"
import { BudgetComparisonChart } from "@/components/budget-comparison-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { Link } from "react-router-dom"

export function DashboardView(
    {
        transactions,
        totalIncome,
        totalBudget,
        totalExpenses,
        netBalance,
        budgets
    }
) {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Link to="/transactions">
                        <Button className="cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Transaction
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            +{transactions.filter((t) => t.money > 0).length} transactions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {transactions.filter((t) => t.money < 0).length} transactions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                            ${netBalance.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Current balance</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
                        <Target className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">${totalBudget.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">{budgets.length} categories</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Monthly Expenses</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <MonthlyExpensesChart transactions={transactions} />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Expenses by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CategoryPieChart transactions={transactions} />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Budget vs Actual</CardTitle>
                        <CardDescription>Compare your spending against your budget</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <BudgetComparisonChart transactions={transactions} budgets={budgets} />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Your latest financial activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentTransactions transactions={transactions.slice(0, 5)} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )

}