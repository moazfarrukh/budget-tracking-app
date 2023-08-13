import { createContext } from "react"
import { SelectedBudgetContextType } from "../types/Budget"
const selectedBudgetContext = createContext<SelectedBudgetContextType | null>(null)
export default selectedBudgetContext
