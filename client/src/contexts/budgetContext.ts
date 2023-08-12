import { createContext } from "react"
import { budgetContextType } from "../types/Budget"
const budgetContext = createContext<budgetContextType | null>(null)
export default budgetContext
