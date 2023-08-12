import "./App.css";

import { useState } from "react";
import { AppRoutes } from "./routes/routes";
import { IUserData } from "./types/User";
import userContext from "./contexts/userContext";
import Navbar from "./components/Navbar";
function App() {
  const [userData, setUserData] = useState<IUserData>({ token: "" });
  const value = { userData, setUserData };

  return (
    <userContext.Provider value={value}>
      <Navbar />
      <AppRoutes />
    </userContext.Provider>
  );
}

export default App;
