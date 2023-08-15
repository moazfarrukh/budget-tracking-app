import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import TextInput from "../components/TextInput";
import { useState, useContext } from "react";
import userContext from "../contexts/userContext";
import { userContextType } from "../types/User";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userData, setUserData } = useContext(userContext) as userContextType;
  const navigate = useNavigate();

  const formLoginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(async (res: Response) => {
        if (!res.ok) {
          console.log(await res.json());
        } else {
          const data = await res.json();
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
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link>Dont have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </div>
  );
}

export default LogIn;
