import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Card,
  Typography,
  AlertColor,
} from "@mui/material";
import TextInput from "../components/TextInput";
import { useState } from "react";
import { userLoginInfo } from "../types/User";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../utils/userAuth";
import { submitButtonStyle } from "../styles/Submit";
import { Link as NavLink } from "react-router-dom";
import AlertBar from "../components/AlertBar";

function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const formLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await userLogin({
      email: email,
      password: password,
    } as userLoginInfo);

    if (success) {
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
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                setFieldState={setPassword}
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
