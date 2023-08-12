import { createContext } from "react"
import { userContextType } from "../types/userContext"
const userContext = createContext<userContextType | null>(null)
export default userContext