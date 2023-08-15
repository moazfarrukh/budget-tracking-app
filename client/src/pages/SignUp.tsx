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
import { userContextType } from "../types/User";
import { Link as NavLink } from "react-router-dom";
function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [budgetLimit, setBudgetLimit] = useState<number>(0);
  const { userData, setUserData } = useContext(userContext) as userContextType;
  const navigate = useNavigate();

  const formSignUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:8000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        budget_limit: budgetLimit,
      }),
    })
      .then(async (res: Response) => {
        if (!res.ok) {
          console.log(await res.json());
        } else {
          const data = await res.json();
          setUserData({ token: data.token });
          localStorage.setItem("token", data.token);
          setUserData({ token: data.token });
          localStorage.getItem("token");
          navigate("/budget");
        }
      })
      .catch();
  };
  return (
    <div>
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
                sx={{
                  height: 40,
                  backgroundColor: "orange",
                  borderColor: "green",
                  ":hover": {
                    bgcolor: "darkorange",
                    color: "white",
                  },
                }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    <NavLink to="/login">
                      Already have an account? Sign in
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
