import {
  Box,
  Button,
  Container,
  Card,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import TextInput from "../components/TextInput";
import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import NumberInput from "../components/NumberInput";
import userContext from "../contexts/userContext";
import { userContextType, userSignUpInfo } from "../types/User";
import { Link as NavLink } from "react-router-dom";
import { UserSignUp } from "../utils/userAuth";
import { submitButtonStyle } from "../styles/Submit";
import AlertBar from "../components/AlertBar";

function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [budgetLimit, setBudgetLimit] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const formSignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await UserSignUp({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      budgetLimit: budgetLimit,
    } as userSignUpInfo);
    if (success) {
      navigate("/budget");
    }
  };
  return (
    <div>
      <AlertBar
        setOpen={setAlertOpen}
        open={alertOpen}
        horizontal="center"
        text="Error Signing Up"
        severity={"error"}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        width="100%"
      >
        <Container maxWidth="xs">
          <Card variant="outlined" sx={{ padding: "26px" }}>
            <Box display="flex" justifyContent="center">
              <Typography
                component="h1"
                sx={{ marginBottom: "10px" }}
                variant="h5"
              >
                Sign up
              </Typography>
            </Box>

            <form onSubmit={formSignUpHandler} noValidate>
              <TextInput
                label="First Name"
                name="firstName"
                setFieldState={setFirstName}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                setFieldState={setLastName}
              />
              <TextInput
                label="Email Address"
                name="email"
                setFieldState={setEmail}
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                setFieldState={setPassword}
              />
              <NumberInput
                label="Budget Limit"
                name="budgetLimit"
                setFieldState={setBudgetLimit}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={submitButtonStyle}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    <NavLink to="/login">
                      Already have an account? Log in
                    </NavLink>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </Box>
    </div>
  );
}

export default SignUp;
