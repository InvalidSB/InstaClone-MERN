import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Link, useHistory } from "react-router-dom";

// import Alert from '@material-ui/lab/Alert';
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="suzansharma.com.np">
        InvalidSB
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  choosefile: {
    margin: "10px 0px",
    color: "white",
    "&>input": {
      padding: "15px 15px",
      backgroundColor: "gray",
      borderRadius: "10px",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState("");

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const history = useHistory();

  

  const UploadProfile = () => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "initGram");
    data.append("cloud_name", "init");
    // first cloudinary ma upload garne
    fetch(" https://api.cloudinary.com/v1_1/init/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        setUrl(result.url);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    if (url) {
      uplpstFields();
    }
  }, [url]);

  // common part with or without image ko lagi
  const uplpstFields = () => {
    if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setMessage("Email you just enter dosn't exist");
      return;
    }
    fetch("/api/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic:url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage("Some error occured,try again");
        } else {
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    setShow(true);
    if (photo) {
      UploadProfile();
      console.log("yo call vayo")
    } else {
      uplpstFields();
    }
  };


  return (
    <>
      {show ? <Alert severity="info">{message}</Alert> : null}
      <Container
        component="main"
        maxWidth="xs"
        style={{
          // backgroundColor: "#abccff",
          borderRadius: 20,
          border: "1px solid",
          marginTop: 70,
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              value={name}
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Upload Profile</p>
            <div className={classes.choosefile}>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
            <FormControlLabel
              style={{ marginTop: 15 }}
              control={<Checkbox value="remember" color="primary" />}
              label="By signing up, you agree to our Terms, Data Policy and Cookie Policy."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signin" variant="body2">
                  {"Have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
