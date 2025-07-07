
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MonthlyExpensesChart } from "@/components/monthly-expenses-chart"
import { CategoryPieChart } from "@/components/category-pie-chart"
import { BudgetComparisonChart } from "@/components/budget-comparison-chart"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"


export function AnalyticsView(
    {
        selectedMonth,
        setSelectedMonth,
        insights,
        transactions,
        budgets
    }
) {

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
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
            </div>

            {/* Insights Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
                        {insights.budgetUtilization > 100 ? (
                            <TrendingUp className="h-4 w-4 text-red-600" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-green-600" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`text-2xl font-bold ${insights.budgetUtilization > 100
                                ? "text-red-600"
                                : insights.budgetUtilization > 80
                                    ? "text-yellow-600"
                                    : "text-green-600"
                                }`}
                        >
                            {insights.budgetUtilization.toFixed(1)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            ${insights.totalSpent.toLocaleString()} of ${insights.totalBudget.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Spending Category</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{insights.topCategory ? insights.topCategory[0] : "N/A"}</div>
                        <p className="text-xs text-muted-foreground">
                            {insights.topCategory ? `$${insights.topCategory[1].toLocaleString()}` : "No data"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Budget Alerts</CardTitle>
                        {insights.overBudgetCategories.length > 0 ? (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`text-2xl font-bold ${insights.overBudgetCategories.length > 0 ? "text-red-600" : "text-green-600"
                                }`}
                        >
                            {insights.overBudgetCategories.length}
                        </div>
                        <p className="text-xs text-muted-foreground">Categories over budget</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{insights.transactionCount}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Spending Insights */}
            {(insights.overBudgetCategories.length > 0 || insights.warningCategories.length > 0) && (
                <Card>
                    <CardHeader>
                        <CardTitle>Spending Insights</CardTitle>
                        <CardDescription>Areas that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {insights.overBudgetCategories.map((category) => (
                                <div key={category.category} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <AlertTriangle className="h-4 w-4 text-red-600" />
                                        <span className="font-medium">{category.category}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-red-600">
                                            Over budget by ${(category.spent - category.budget).toLocaleString()}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {category.percentage.toFixed(1)}% of budget used
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {insights.warningCategories.map((category) => (
                                <div key={category.category} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                        <span className="font-medium">{category.category}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-yellow-600">
                                            ${(category.budget - category.spent).toLocaleString()} remaining
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {category.percentage.toFixed(1)}% of budget used
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Monthly Spending Trend</CardTitle>
                        <CardDescription>Track your spending patterns over time</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <MonthlyExpensesChart transactions={transactions} />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Category Breakdown</CardTitle>
                        <CardDescription>Where your money goes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CategoryPieChart transactions={transactions} />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Budget Performance</CardTitle>
                    <CardDescription>Compare your actual spending against your budgets</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <BudgetComparisonChart transactions={transactions} budgets={budgets} />
                </CardContent>
            </Card>
        </div>
    )
}