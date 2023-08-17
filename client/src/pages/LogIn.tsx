import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Card,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link as NavLink, useNavigate } from "react-router-dom";

import {
  authenticatedContext,
  authenticatedContextType,
  userLoginInfo,
  userLogin,
  submitButtonStyle,
  TextInput,
  AlertBar,
} from "../index";

function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [loginSubmitted, setLoginSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const { setAuthenticated } = useContext(
    authenticatedContext
  ) as authenticatedContextType;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  });

  const formLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginSubmitted(true);
    const success = await userLogin({
      email: email,
      password: password,
    } as userLoginInfo);

    if (success) {
      setAuthenticated(true);
      navigate("/budget");
    } else {
      setAlertOpen(true);
    }
  };

  return (
    <div>
      <AlertBar
        setOpen={setAlertOpen}
        open={alertOpen}
        horizontal="center"
        text="incorrect email or password"
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
                Login
              </Typography>
            </Box>
            <form onSubmit={formLoginHandler} noValidate>
              <TextInput
                label="Email Address"
                name="email"
                setFieldState={setEmail}
                field={email}
                error={true}
                errorText="Enter your email"
                submitted={loginSubmitted}
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                setFieldState={setPassword}
                field={password}
                error={true}
                errorText="Enter your password"
                submitted={loginSubmitted}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={submitButtonStyle}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link>
                    <NavLink to="/signup">
                      Dont have an account? Sign up
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

export default LogIn;
