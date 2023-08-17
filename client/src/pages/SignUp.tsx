import {
  Box,
  Button,
  Container,
  Card,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NumberInput from "../components/NumberInput";
import { Link as NavLink } from "react-router-dom";

import {
  authenticatedContext,
  AlertBar,
  UserSignUp,
  authenticatedContextType,
  userSignUpInfo,
  submitButtonStyle,
  TextInput,
} from "../index";

function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [budgetLimit, setBudgetLimit] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [signUpSubmitted, SetSignUpSubmitted] = useState<boolean>(false);

  const { setAuthenticated } = useContext(
    authenticatedContext
  ) as authenticatedContextType;

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, [setAuthenticated]);

  const formSignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetSignUpSubmitted(true);
    const success = await UserSignUp({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      budgetLimit: budgetLimit,
    } as userSignUpInfo);
    if (success) {
      setAuthenticated(true);
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
                field={firstName}
                submitted={signUpSubmitted}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                setFieldState={setLastName}
                field={lastName}
                submitted={signUpSubmitted}
              />
              <TextInput
                label="Email Address"
                name="email"
                setFieldState={setEmail}
                submitted={signUpSubmitted}
                field={email}
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                setFieldState={setPassword}
                submitted={signUpSubmitted}
                field={password}
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
