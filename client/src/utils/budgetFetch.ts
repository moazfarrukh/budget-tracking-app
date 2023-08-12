import userContext from "../contexts/userContext";
import { IUserData } from "../types/User";
import { BudgetData } from "../types/Budget";

type SetBudgetHandler = (BudgetDataList: [BudgetData]) => void;

export const getBudgetData = async (
    userData: IUserData,
    setBudgetDataList: SetBudgetHandler
): Promise<boolean> => {
    const response = await fetch("http://localhost:8000/budget", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        setBudgetDataList(data.budget_list as [BudgetData]);
        return true;
    } else {
        console.log("error");
        return false;
    }
};

export const postBudgetData = async (
    userData: IUserData,
    budgetData: BudgetData
): Promise<boolean> => {
    const response = await fetch("http://localhost:8000/budget", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(budgetData),
    });
    if (response.ok) {
        console.log("success");
        return true;
    } else {
        console.log("error");
        return false;
    }
};
