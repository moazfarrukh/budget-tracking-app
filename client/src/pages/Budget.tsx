import userContext from "../contexts/userContext";
import { userContextType } from "../types/User";
import { useContext, useEffect, useState } from "react";
import { Box, Card, Button } from "@mui/material";
import {
  BudgetData,
  SelectedBudgetContextType,
  budgetContextType,
} from "../types/Budget";

import AddBudgetModal from "../components/AddBudgetModal";
import { getBudgetData } from "../utils/budgetFetch";
import budgetContext from "../contexts/budgetContext";
import FilterByDate from "../components/FilterByDate";
import { addButtonStyle } from "../styles/Budget";
import BudgetTable from "../components/BudgetTable";
import EditBudgetModal from "../components/EditBudgetModal";
import selectedBudgetContext from "../contexts/selectedBudgetContext";
import filterContext from "../contexts/filterContext";

function Budget() {
  const { userData, setUserData } = useContext(userContext) as userContextType;
  const [budgetDataList, setBudgetDataList] = useState<BudgetData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const [filterToggle, setFilterToggle] = useState<boolean>(false);
  const intialBudgetData: BudgetData = {
    user: "",
    transaction_name: "",
    transaction_date: "",
    price: 0,
    _id: "",
  };
  const [selectedbudget, setSelectedBudget] =
    useState<BudgetData>(intialBudgetData);
  const selectedBudgetValue = {
    selectedBudget: selectedbudget,
    setSelectedBudget: setSelectedBudget,
    setEditOpen: setEditOpen,
  } as SelectedBudgetContextType;

  const budgetDataListValue = {
    budgetDataList,
    setBudgetDataList,
  } as budgetContextType;

  const filterValue = {
    filterDate,
    setFilterDate,
    filterToggle,
    setFilterToggle,
  };

  useEffect(() => {
    getBudgetData(userData, setBudgetDataList);
  }, [setBudgetDataList, userData]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <budgetContext.Provider value={budgetDataListValue}>
      <selectedBudgetContext.Provider value={selectedBudgetValue}>
        <filterContext.Provider value={filterValue}>
          <Box
            minHeight="100vh"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <EditBudgetModal setOpen={setEditOpen} open={editOpen} />

            <AddBudgetModal open={open} setOpen={setOpen} />

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
        </filterContext.Provider>{" "}
      </selectedBudgetContext.Provider>
    </budgetContext.Provider>
  );
}

export default Budget;
