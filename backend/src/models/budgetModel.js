import Budget from "../db/schemas/budget.js"

class BudgetModel {

    async save(budget) {
        try {
            return await Budget.insertOne(budget)
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getMonthBudgets(query) {
        try {
            return await Budget.find(query)
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

}


export default BudgetModel;