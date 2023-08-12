import {Button} from "@mui/material"

interface FormButtonProps{
    label:string
}

function FormButton({label}:FormButtonProps) {
  return (
    <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
  >
    {label}
  </Button>
  )
}

export default FormButton