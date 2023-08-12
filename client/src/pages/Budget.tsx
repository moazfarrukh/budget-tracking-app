import userContext from "../contexts/userContext";
import { userContextType } from "../types/userContext";
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
import { BudgetColumn, BudgetData } from "../types/Budget";
import { DateField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { convertDateFormat } from "../utils/dateFormat";
import ChildModal from "../components/BudgetModal";
function Budget() {
  const { userData } = useContext(userContext) as userContextType;
  const [budgetDataList, setBudgetDataList] = useState<BudgetData[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/budget", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then(async (res: Response) => {
        if (!res.ok) {
          console.log("error");
        } else {
          const data = await res.json();
          setBudgetDataList(data.budget_list as [BudgetData]);
        }
      })
      .catch((err) => {
        console.log("catch err", err);
      });
  }, [setBudgetDataList, userData]);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns: BudgetColumn[] = [
    { id: "transaction_name", label: "Name", align: "center", minWidth: 100 },
    { id: "price", label: "Price", align: "center", minWidth: 100 },
    { id: "transaction_date", label: "Date", align: "center", minWidth: 170 },
  ];

  return (
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
          <Box display="flex" gap="10px">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Filter by Date"
                defaultValue={dayjs("2023-08-11")}
              />
            </LocalizationProvider>

            <Button
              type="submit"
              sx={{
                backgroundColor: "orange",
                borderColor: "green",
                textTransform: "none",

                color: "black",
                ":hover": {
                  bgcolor: "darkorange",
                },
              }}
            >
              Filter Records
            </Button>
          </Box>
          <Button
            type="submit"
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              ":hover": {
                bgcolor: "black",
              },
            }}
            onClick={handleOpen}
          >
            Add Budget
          </Button>
        </Box>

        <TableContainer sx={{ border: "1px solid #ececec", mt: "20px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {budgetDataList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        let value = row[column.id as keyof BudgetData];
                        if (column.id === "transaction_date") {
                          value = convertDateFormat(value as string);
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TableFooter> */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={budgetDataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* </TableFooter> */}
      </Card>
    </Box>
  );
}

export default Budget;
