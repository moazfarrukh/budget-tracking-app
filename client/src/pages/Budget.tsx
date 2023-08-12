import userContext from "../contexts/userContext";
import { userContextType } from "../types/User";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableFooter,
  TablePagination,
  Button,
  TableHead,
} from "@mui/material";
import { BudgetData, budgetContextType } from "../types/Budget";

import ChildModal from "../components/BudgetModal";
import { getBudgetData } from "../utils/budgetFetch";
import budgetContext from "../contexts/budgetContext";
import FilterByDate from "../components/FilterByDate";
import { addButtonStyle } from "../styles/Budget";
import BudgetTable from "../components/BudgetTable";

function Budget() {
  const { userData } = useContext(userContext) as userContextType;
  const [budgetDataList, setBudgetDataList] = useState<BudgetData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const value = { budgetDataList, setBudgetDataList } as budgetContextType;

  useEffect(() => {
    getBudgetData(userData, setBudgetDataList);
  }, [setBudgetDataList, userData]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <budgetContext.Provider value={value}>
      <Box
        minHeight="100vh"
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ChildModal open={open} setOpen={setOpen} />

        <Card variant="outlined" sx={{ padding: "26px" }}>
          <Box display="flex" justifyContent="space-between">
            <FilterByDate />
            <Button type="submit" sx={addButtonStyle} onClick={handleOpen}>
              Add Budget
            </Button>
          </Box>
          <BudgetTable />
        </Card>
      </Box>
    </budgetContext.Provider>
  );
}

export default Budget;
