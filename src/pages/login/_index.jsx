import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
// import uniLogo from "../../assets/uni-logo.png";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  Link,
} from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../../components/auth/context/AuthContext";
import { useContext, useState } from "react";
import { CircularProgress } from "@mui/material";

export const loginAction = async ({ request }) => {
  if (request.method !== "POST") return {};

  const formData = await request.formData();

  const formDataObject = Object.fromEntries(formData.entries());

  let response;

  try {
    response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: formDataObject.username,
        password: formDataObject.password,
      }),
    });

    if (response.ok) {
      response = await response.json();
    }
  } catch (err) {
    console.log("we have an error");
  }

  return response;
};

const Login = () => {
  const response = useActionData();
  const navigate = useNavigate();
  const { toggleAuth } = useContext(AuthContext);
  const [loginError, setLoginError] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    if (response?.is_staff) {
      localStorage.setItem("token", response?.refresh);
      localStorage.setItem("access", response?.access);
      localStorage.setItem("userId", response?.id);
      localStorage.setItem("username", response?.username);

      toggleAuth();
      navigate("/");
    } else {
      if (response?.is_staff == false) {
        setLoginError("This user is not admin");
      }
    }
    if (response?.error) {
      setLoginError(response?.error);
    }
  }, [response]);

  return (
    <div className="login">
      {/*  <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          backgroundColor: "#fff",
          padding: "10px",
          borderBottomRightRadius: "20px",
        }}
      >
        <img style={{ width: "63px", height: "23px" }} src={uniLogo} />
      </div>*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fff",
            padding: "30px",
            borderRadius: "40px",
            width: "400px",
            gap: "20px",
          }}
        >
          <Avatar color="primary" sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="p" variant="h4">
            Login
          </Typography>
          {loginError && (
            <Typography
              sx={{ color: "#8A2E29" }}
              component="p"
              variant="caption"
            >
              {loginError}
            </Typography>
          )}

          <Form method="post" action=".">
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                error={loginError ? true : false}
                margin="normal"
                required
                fullWidth
                id="uername"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                variant="standard"
                onChange={() => {
                  setLoginError(undefined);
                }}
              />
              <TextField
                error={loginError ? true : false}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                onChange={() => {
                  setLoginError(undefined);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                disabled={loginError ? true : false}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, borderRadius: "20px", p: "10px" }}
              >
                {navigation.state === "submitting" ? (
                  <CircularProgress color="inherit" size={"25px"} />
                ) : (
                  "Sign In"
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              ml: "20px",
              bgcolor: "#fff",
              padding: "20px",
              borderRadius: "40px",
              width: "400px",
            }}
          >
            <Typography component="h1" variant="h1">
              LMS
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: 4,
              ml: "20px",
              bgcolor: "#fff",
              padding: "20px",
              borderRadius: "30px",
              width: "400px",
            }}
          >
            <Typography component="p" variant="h5">
              UOK provide LMS for their staff in order to manage university
              library effectivly<span>&#128218;</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
