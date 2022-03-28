import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import authUtils from "../Utils/authUtils";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [catchError, setCatchError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsernameError(false);
    setPasswordError(false);

    if (userAccount.username === "") {
      setUsernameError(true);
    }
    if (userAccount.password === "") {
      setPasswordError(true);
    }
    if (userAccount.username && userAccount.password) {
      try {
        let data = await authUtils.login(userAccount);
        console.log(data);
        let data2 = await authUtils.get_user_fullname(userAccount.username);
        sessionStorage["token"] = data.token;
        sessionStorage["username"] = userAccount.username;
        sessionStorage["fullName"] = data2;
        navigate("/mainPage");
      } catch (e) {
        setCatchError(true);
        console.log("Something's wrong.");
      }
    }
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            error={usernameError}
            onChange={(e) =>
              setUserAccount({ ...userAccount, username: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={passwordError}
            onChange={(e) =>
              setUserAccount({ ...userAccount, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Sign In
          </Button>
          {catchError && (
            <Box>
              <Typography variant="body2" color="error">
                Please check again your username and password.
              </Typography>
            </Box>
          )}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
};

export default LoginPage;
