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
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../../components/auth/context/AuthContext";
import { useContext, useState } from "react";
import { CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

export const signupAction = async ({ request }) => {
  if (request.method !== "POST") return {};

  const formData = await request.formData();

  const formDataObject = Object.fromEntries(formData.entries());
  let response;
 if (formDataObject.confirmPassword !== formDataObject.password) {
  return { error: "Passwords do not match" };
}

  try {
    response = await fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        first_name: formDataObject.first_name,
        last_name: formDataObject.lastName,
        username: formDataObject.username,
        email: formDataObject.email,
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

const Signup = () => {
  const response = useActionData();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();
  console.log(loginError);
  const navigation = useNavigation();

  useEffect(() => {
    
    if(response?.id){
      navigate("/login");
    }
  }, [response]);

  return (
    <div className="login">
    
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
            Sign up
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
                margin="normal"
                required
                fullWidth
                name="first_name"
                label="First Name"
                id="first_name"
                autoComplete="given-name"
                variant="standard"
                onChange={() => {
                  setLoginError(undefined);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                autoComplete="family-name"
                variant="standard"
                onChange={() => {
                  setLoginError(undefined);
                }}
              />

              <TextField
              error={response?.username?true:false}
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
                autoComplete="username"
                variant="standard"
                onChange={() => {
                  setLoginError(undefined);
                }}
                helperText={response?.username&&"A user with that username already exists"}
              />

              <TextField
                error={response?.email==='Enter a valid email address.'? true : false}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
                onChange={() => {
                  setLoginError(undefined);
                }}
                helperText={response?.email==='Enter a valid email address.'&& "Enter a valid email address"}

                
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
                <TextField
                error={response?.error==='Passwords do not match'?true:false}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                variant="standard"
                onChange={() => {
                  setLoginError(undefined);
                }}              
                helperText={response?.error==='Passwords do not match'&& "Passwords do not match"}
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
                  "Sign up"
                )}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Back to login"}
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
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Tips
                </ListSubheader>
              }
            >
              <ListItem>
                <ListItemText primary="" />
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemText primary="Starred" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem>
                <ListItemText primary="Sent mail" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Drafts" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
