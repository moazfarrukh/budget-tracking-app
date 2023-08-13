import {
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  IconButton,
  Tab,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { TableStyle } from "../styles/Budget";
import { BudgetColumn, BudgetData, budgetContextType } from "../types/Budget";
import { convertDateFormat } from "../utils/dateFormat";
import budgetContext from "../contexts/budgetContext";
import ActionButton from "./ActionButton";
function BudgetTable() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { budgetDataList } = useContext(budgetContext) as budgetContextType;
  const columns: BudgetColumn[] = [
    { id: "transaction_name", label: "Name", align: "center", minWidth: 100 },
    { id: "price", label: "Price", align: "center", minWidth: 100 },
    { id: "transaction_date", label: "Date", align: "center", minWidth: 170 },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayTableHeaders = columns.map((column) => (
    <TableCell
      key={column.id}
      align={column.align}
      style={{ minWidth: column.minWidth }}
    >
      {column.label}
    </TableCell>
  ));

  const displayTableData = budgetDataList
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
          <TableCell key={"action"} align={"center"}>
            <ActionButton object_id={row._id} />
          </TableCell>
        </TableRow>
      );
    });

  return (
    <>
    
      <TableContainer sx={TableStyle}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {displayTableHeaders}
              <TableCell key="action" align="center" style={{ minWidth: 100 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayTableData}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={budgetDataList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default BudgetTable;
