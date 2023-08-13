import { createContext } from "react";
import { filterContextType } from "../types/Budget";

const filterContext = createContext<filterContextType | null>(null)
export default filterContext
