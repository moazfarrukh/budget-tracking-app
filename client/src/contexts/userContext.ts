import { createContext } from "react"
import { userContextType } from "../types/User"
const userContext = createContext<userContextType | null>(null)
export default userContext
