import { budgetAnalytics } from "../types/Budget";

const isBroken = async () => {
    return false;
}

export const getAnalytics = async (
    setBudgetAnalytics: (value: budgetAnalytics[]) => void): Promise<boolean> => {
    try {
        const response = await fetch("http://localhost:8000/budget/analytics", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            const sorted_budgets = (data.analytics as budgetAnalytics[]).sort((budgetA, budgetB) => {
                return new Date(budgetA.date).setHours(0, 0, 0, 0) - new Date(budgetB.date).setHours(0, 0, 0, 0)
            })
            setBudgetAnalytics(sorted_budgets)
            return true;
        } else {
            console.log("error");
            return await isBroken();
        }
    } catch (error) {
        return await isBroken();

    }
};
