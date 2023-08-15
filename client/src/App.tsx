import "./App.css";

import { useState } from "react";
import { IUserData } from "./types/User";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Budget from "./pages/Budget";
import BudgetAnalytics from "./pages/BudgetAnalytics";

import userContext from "./contexts/userContext";
import Navbar from "./components/Navbar";
function App() {
  const [userData, setUserData] = useState<IUserData>({ token: "" });
  const value = { userData, setUserData };

  return (
    <userContext.Provider value={value}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<SignUp />} path="/" />
          <Route element={<LogIn />} path="/login" />
          <Route element={<Budget />} path="/budget" />
          <Route element={<BudgetAnalytics />} path="/analytics" />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
