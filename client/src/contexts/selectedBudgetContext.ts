import { createContext } from "react"
import { SelectedBudgetContextType } from "../index"
const selectedBudgetContext = createContext<SelectedBudgetContextType | null>(null)
export default selectedBudgetContext
