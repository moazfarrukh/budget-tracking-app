import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import {
  BudgetData,
  SelectedBudgetContextType,
  budgetContextType,
  selectedBudgetContext,
  budgetContext,
  deleteBudgetData,
  getBudgetData,
} from "../index";

interface ActionButtonProps {
  object_id: string;
}

function ActionButton({ object_id }: ActionButtonProps) {
  const { setSelectedBudget, setEditOpen } = useContext(
    selectedBudgetContext
  ) as SelectedBudgetContextType;
  const { budgetDataList, setBudgetDataList } = useContext(
    budgetContext
  ) as budgetContextType;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // returns false if null
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = async () => {
    handleClose();
    setEditOpen(true);
    setSelectedBudget(
      budgetDataList.find((data) => {
        return data._id === object_id;
      }) as BudgetData
    );
  };
  const handleDelete = async () => {
    handleClose();
    const success = await deleteBudgetData(object_id);
    if (success) {
      getBudgetData(setBudgetDataList);
    } else {
    }
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}

export default ActionButton;
