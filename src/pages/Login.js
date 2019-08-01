import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

const Login = () => {
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
              pathname: '/',
              state: { from: props.location }
            }}
          />
        }
      />
    )
  }

  return (
    <form onSubmit={(e) => { submitForm(e); }}>
      <p>
        <label>username:</label>
        <input onChange={(e) => { handleChange(e); }} type={'text'} name={'formEmail'} id={'email'} required/>
      </p>
      <p>
        <label>password:</label>
        <input onChange={(e) => { handleChange(e); }} type={'password'} name={'formPassword'} id={'password'} required/>
      </p>
      <p><button type={'submit'}>login</button></p>
    </form>
  );
}

export default Login;