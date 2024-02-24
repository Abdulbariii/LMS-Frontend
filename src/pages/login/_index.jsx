import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
// import uniLogo from "../../assets/uni-logo.png";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../../components/auth/context/AuthContext";
import { useContext } from "react";

export const loginAction = async ({ request }) => {
  if (request.method !== "POST") return {};

  const formData = await request.formData();

  const formDataObject = Object.fromEntries(formData.entries());

  let response;

  try {
    response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: formDataObject.email,
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

  useEffect(() => {
    if (response?.access) {
      localStorage.setItem("token", response?.refresh);
      localStorage.setItem("access", response?.access);

      toggleAuth();
      navigate("/");
    }

    if (response?.details) {
      // user is not auth
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
          <Form method="post" action=".">
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, borderRadius: "20px", p: "10px" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
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
