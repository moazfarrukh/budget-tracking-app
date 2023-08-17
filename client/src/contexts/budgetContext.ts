import { createContext } from "react"
import { budgetContextType } from "../index"
const budgetContext = createContext<budgetContextType | null>(null)
export default budgetContext
