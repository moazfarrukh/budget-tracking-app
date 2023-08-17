import { createContext } from "react";
import { filterContextType } from "../index";

const filterContext = createContext<filterContextType | null>(null)
export default filterContext
