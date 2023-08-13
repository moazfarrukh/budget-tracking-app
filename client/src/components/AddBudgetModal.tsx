import { useState, useContext } from "react";
import {
  IconButton,
  Box,
  Modal,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import DateInput from "./DateInput";
import dayjs, { Dayjs } from "dayjs";
import { getBudgetData, postBudgetData } from "../utils/budgetFetch";
import userContext from "../contexts/userContext";
import { userContextType } from "../types/User";
import { BudgetData, budgetContextType } from "../types/Budget";
import budgetContext from "../contexts/budgetContext";
import { DividerStyle, BudgetModalStyle } from "../styles/BudgetModal";
import { addButtonStyle } from "../styles/Budget";

interface BudgetModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function AddBudgetModal({ open, setOpen }: BudgetModalProps) {
  const [tName, setTName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  // stores the current time by default
  const [tDate, setTDate] = useState<Dayjs | null>(dayjs());
  const { userData } = useContext(userContext) as userContextType;
  const { setBudgetDataList } = useContext(budgetContext) as budgetContextType;

  const handleClose = () => {
    setOpen(false);
  };

  const handlebudgetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await postBudgetData(userData, {
      transaction_name: tName,
      transaction_date: tDate?.toString(),
      price: price,
    } as BudgetData);

    if (success) {
      handleClose();
      getBudgetData(userData, setBudgetDataList);
    } else {
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...BudgetModalStyle }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Add Budget</Typography>
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider style={DividerStyle} />
          <TextInput label="Name" name="name" setFieldState={setTName} />
          <NumberInput label="Price" name="price" setFieldState={setPrice} />
          <DateInput label="Date" setDate={setTDate} />
          <form onSubmit={handlebudgetSubmit} noValidate>
            <Button
              variant="contained"
              sx={addButtonStyle}
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default AddBudgetModal;
