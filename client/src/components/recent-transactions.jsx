
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"


export function RecentTransactions({ transactions }) {
  if (transactions.length === 0) {
    return <div className="text-center text-muted-foreground py-4">No recent transactions</div>
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.transactionId} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-xs text-muted-foreground">{format(new Date(transaction.date), "MMM dd, yyyy")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {transaction.category}
            </Badge>
            <div className={`text-sm font-medium ${transaction.money >= 0 ? "text-green-600" : "text-red-600"}`}>
              {transaction.money >= 0 ? "+" : ""}${Math.abs(transaction.money).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
