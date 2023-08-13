export interface BudgetColumn {
    id: string,
    label: string,
    minWidth: number,
    align: "left" | "right" | "center" | "justify" | "inherit",
}
export interface BudgetData {
    price: number
    transaction_date: string
    transaction_name: string
    user: string
    _id: string;
}
export interface budgetContextType {
    budgetDataList: BudgetData[],
    setBudgetDataList: (BudgetDataList: BudgetData[]) => void
}

export interface SelectedBudgetContextType {
    selectedBudget: BudgetData,
    setSelectedBudget: (BudgetDataList: BudgetData) => void
    setEditOpen: (editOpen: boolean) => void
}