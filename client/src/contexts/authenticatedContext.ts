import { createContext } from "react"
import { authenticatedContextType } from "../index";
const authenticatedContext = createContext<authenticatedContextType | null>(null)
export default authenticatedContext;
