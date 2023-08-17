import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Budget from "./pages/Budget";
import BudgetAnalytics from "./pages/BudgetAnalytics";
import authenticatedContext from "./contexts/authenticatedContext";
import Navbar from "./components/Navbar";
import { useState } from "react";
function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const value = { authenticated, setAuthenticated };
  return (
    <BrowserRouter>
      <authenticatedContext.Provider value={value}>
        <Navbar />
        <Routes>
          <Route element={<SignUp />} path="/signup" />
          <Route element={<LogIn />} path="/login" />
          <Route element={<Budget />} path="/budget" />
          <Route element={<BudgetAnalytics />} path="/analytics" />
          <Route element={<LogIn />} />
        </Routes>
      </authenticatedContext.Provider>
    </BrowserRouter>
  );
}

export default App;
