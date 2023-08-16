import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Budget from "./pages/Budget";
import BudgetAnalytics from "./pages/BudgetAnalytics";

import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<SignUp />} path="/signup" />
        <Route element={<LogIn />} path="/login" />
        <Route element={<Budget />} path="/budget" />
        <Route element={<BudgetAnalytics />} path="/analytics" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
