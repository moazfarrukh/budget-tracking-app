import { useContext, useEffect, useState } from "react";
import { Box, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  BudgetData,
  SelectedBudgetContextType,
  budgetContextType,
  AddBudgetModal,
  getBudgetData,
  useBudgetLimitFetch,
  budgetContext,
  FilterByDate,
  addButtonStyle,
  BudgetTable,
  EditBudgetModal,
  filterContext,
  AlertBar,
  authenticatedContext,
  authenticatedContextType,
  selectedBudgetContext,
} from "../index";

function Budget() {
  const [budgetDataList, setBudgetDataList] = useState<BudgetData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const [filterToggle, setFilterToggle] = useState<boolean>(false);
  const { setAuthenticated } = useContext(
    authenticatedContext
  ) as authenticatedContextType;
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

  const navigate = useNavigate();

  const { budgetStatus, setBudgetStatus } = useBudgetLimitFetch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
      getBudgetData(setBudgetDataList);
    }
  }, [setBudgetDataList, setAuthenticated, navigate]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <budgetContext.Provider value={budgetDataListValue}>
      <selectedBudgetContext.Provider value={selectedBudgetValue}>
        <filterContext.Provider value={filterValue}>
          <AlertBar
            open={budgetStatus}
            setOpen={setBudgetStatus}
            text="Budget Limit for this month exceeded"
            severity="warning"
          />
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
        </filterContext.Provider>
      </selectedBudgetContext.Provider>
    </budgetContext.Provider>
  );
}

export default Budget;
