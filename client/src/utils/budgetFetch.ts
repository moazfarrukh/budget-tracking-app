import userContext from "../contexts/userContext";
import { IUserData } from "../types/User";
import { BudgetData } from "../types/Budget";

type SetBudgetHandler = (BudgetDataList: [BudgetData]) => void;
const isBroken = async () => {
    return false;
}
export const getBudgetData = async (
    userData: IUserData,
    setBudgetDataList: SetBudgetHandler
): Promise<boolean> => {
    try {
        const response = await fetch("http://localhost:8000/budget", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setBudgetDataList(data.budget_list as [BudgetData]);
            return true;
        } else {
            console.log("error");
            return await isBroken()
                ;
        }
    }
    catch (err) {
        return await isBroken()
            ;
    }
};
export const deleteBudgetData = async (userData: IUserData, object_id: string): Promise<boolean> => {
    try {
        const response = await fetch("http://localhost:8000/budget", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ object_id: object_id }),
        });
        if (response.ok) {
            console.log("success");
            return true;
        } else {
            console.log("error");
            return await isBroken()
                ;
        }
    }
    catch (err) {
        return await isBroken()
            ;
    }
}

export const postBudgetData = async (
    userData: IUserData,
    budgetData: BudgetData
): Promise<boolean> => {
    try {


        const response = await fetch("http://localhost:8000/budget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(budgetData),
        });
        if (response.ok) {
            console.log("success");
            return true;
        } else {
            console.log("error");
            return await isBroken()
                ;
        }
    } catch (error) {
        return await isBroken()
            ;
    }
};


export const updateBudgetData = async (
    userData: IUserData,
    budgetData: BudgetData
): Promise<boolean> => {
    try {
        const response = await fetch("http://localhost:8000/budget", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ ...budgetData, object_id: budgetData._id }),
        });
        if (response.ok) {
            console.log("success");
            return true;
        } else {
            console.log("error");
            return await isBroken()
                ;
        }
    } catch (error) {
        return await isBroken()
            ;
    }
};
