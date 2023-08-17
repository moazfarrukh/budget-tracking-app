import { useState, useContext, useEffect } from "react";
import {
  IconButton,
  Box,
  Modal,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

import {
  addButtonStyle,
  DividerStyle,
  BudgetData,
  SelectedBudgetContextType,
  budgetContextType,
  BudgetModalStyle,
  TextInput,
  budgetContext,
  DateInput,
  NumberInput,
  getBudgetData,
  updateBudgetData,
  selectedBudgetContext,
} from "../index";
interface BudgetModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function EditBudgetModal({ open, setOpen }: BudgetModalProps) {
  const { selectedBudget } = useContext(
    selectedBudgetContext
  ) as SelectedBudgetContextType;

  const [tName, setTName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  // stores the current time by default
  const [tDate, setTDate] = useState<Date>(new Date());
  const { setBudgetDataList } = useContext(budgetContext) as budgetContextType;

  useEffect(() => {
    setTDate(new Date(selectedBudget.transaction_date));
    setPrice(selectedBudget.price);
    setTName(selectedBudget.transaction_name);
  }, [selectedBudget, setPrice, setTDate, setTName]);

  const handleClose = () => {
    setOpen(false);
  };

  const handlebudgetUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await updateBudgetData({
      _id: selectedBudget._id,
      transaction_name: tName,
      transaction_date: tDate?.toString(),
      price: price,
    } as BudgetData);

    if (success) {
      handleClose();
      getBudgetData(setBudgetDataList);
    } else {
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...BudgetModalStyle }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Edit Budget</Typography>
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider style={DividerStyle} />
          <TextInput
            label="Name"
            name="name"
            defaultValue={selectedBudget.transaction_name}
            setFieldState={setTName}
            field={tName}
          />
          <NumberInput
            label="Price"
            defaultValue={selectedBudget.price}
            name="price"
            setFieldState={setPrice}
          />
          <DateInput
            label="Date"
            defaultValue={dayjs(selectedBudget.transaction_date)}
            setDate={setTDate}
          />
          <form onSubmit={handlebudgetUpdate} noValidate>
            <Button
              variant="contained"
              sx={addButtonStyle}
              fullWidth
              type="submit"
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default EditBudgetModal;
