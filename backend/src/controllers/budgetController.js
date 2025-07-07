

export class BudgetController {

    constructor(budgetModel) {
        this.budgetModel = budgetModel;
    }

    save = async (req, res) => {
        try {
            const { month, category, budget } = req.body;
            const budgets = await this.budgetModel.save({ month, category, budget });

            res.status(201)
                .json(
                    {
                        success: true,
                        message: "Budget saved",
                        budgetId: budgets._id
                    }
                )
        }
        catch (error) {
            res.status(500)
                .json(
                    {
                        success: false,
                        message: "Internal server error"
                    }
                )
        }
    }

    getMonthBudgets = async (req, res) => {
        try {
            const query = {};
            const { month, category } = req.query;
    
            if(month) query.month = month;
            if(category) query.category = category;
            

            console.log(query)

            const budgets = await this.budgetModel.getMonthBudgets(query);

            res.status(200)
                .json(
                    {
                        success: true,
                        budgets
                    }
                )
        }

        catch (error) {
            res.status(500)
                .json(
                    {
                        success: false,
                        message: "Internal Server error"
                    }
                )
        }
    }

    // getCategoryBudget = async (req, res) => {
    //     try {
    //         const { month, category } = req.query;
    //         const budget = await this.budgetModel.getCategoryBudget(category, month)
    //     }
    //     catch (error) {
    //         console.log(error)
    //         res.status(500)
    //             .json(
    //                 {
    //                     success: false,
    //                     message: "Internal Server error"
    //                 }
    //             )
    //     }
    // }
    
}