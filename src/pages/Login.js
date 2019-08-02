import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Login = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/user/d_che)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const [loginState, setLoginState] = useState({
    loggedIn: false,
    formEmail: '',
    formPassword: '',
  });

  useEffect(() => {
    if (localStorage.getItem('JWT')) {
      setLoginState((prevState) => {
        return { ...prevState, loggedIn: true };
      });
    }
  }, []);

  const handleChange = (e) => {
    loginState[e.target.name] = e.target.value;

    setLoginState((prevState) => {
      return { ...prevState};
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    
    const data = {
      email: loginState.formEmail,
      password: loginState.formPassword
    };
    // console.log(data);

    fetch('/auth/sign_in', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then(
      (res) => { return res.json(); }
    ).catch(
      (error) => {
        console.error('Error:', error);
      }
    ).then(
      (response) => {
        // console.log('Success:', response);
        if (response.token) {
          localStorage.setItem('JWT', response.token);
          setLoginState((prevState) => {
            return { ...prevState, loggedIn: true };
          });
        } else {
          alert('login failed, please try again');
        }
      }
    );
  }

  if (loginState.loggedIn) {
    return (
      <Route
        render={props =>
          <Redirect
            to={{
              pathname: '/admin',
              state: { from: props.location }
            }}
          />
        }
      />
    )
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(e) => { submitForm(e); }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="formEmail"
              autoComplete="email"
              autoFocus
              onChange={(e) => { handleChange(e); }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="formPassword"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => { handleChange(e); }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
