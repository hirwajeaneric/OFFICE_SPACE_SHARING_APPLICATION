import { Button, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthFormContainer, CommandButtons, InnerContainer } from '../../components/styled-components/authenticationPages'

import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signin = () => {  
  // States
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState({ email: '', registrationNumber: 0, password: '' });
  const [progress, setProgress] = useState({ value: '', disabled: false});
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''})

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Functions
  const handleChange = ({currentTarget: input}) => { setFormData({...formData, [input.name]: input.value}) };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };

  const submitForm = (e) => {
    e.preventDefault();
    
    const { email, password } = formData;
     
    if (!email) {
      setResponseMessage({ message: 'Email address must be provided.', severity: 'error' });
      setOpen(true);
      return;
    } else if (!password) {
      setResponseMessage({ message: 'Password is required.', severity: 'error' });
      setOpen(true);
      return;
    } else {
      setProgress({ value: 'Signing in ...', disabled: true});

      axios.post(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/user/signin` , formData)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 200) {
            const { token, ...userInfo } = response.data.user;
            
            setProgress({ value: '', disabled: false });
            localStorage.setItem('usrInfo', JSON.stringify(userInfo));
            localStorage.setItem('usrTkn', token);
            window.location.replace('/');
          }
        }, 2000); 
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setResponseMessage({ message: error.response.data.msg, severity: 'error' });
          setOpen(true);
          setProgress({ value: '', disabled: false });
        }
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content={`Sign in to your OSSA Account.`} /> 
      </Helmet>
      <InnerContainer>
        <h2 style={{ textAlign: 'center' }}>Sign in to your account</h2>
        <AuthFormContainer onSubmit={submitForm}>
          
          <TextField id="email" sx={{ width: '100%' }}  size='small' label="email" variant="outlined" name='email' value={formData.email || ''} onChange={handleChange}/>
          {/* Password field  */}
          <FormControl sx={{ width: '100%' }} size='small' variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name='password' 
              value={formData.password || ''} 
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <CommandButtons>
            {!progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary'>Sign in </Button>}
            {progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary' disabled>Signing in ... </Button>}
            <p>Are you new here? <Link style={{color: 'black'}} to={'../signup'}>Create an account.</Link></p>
          </CommandButtons>
          <div>
            <p style={{ width: '100%' }}>Forgot your password? Click here to <Link style={{color: 'black'}} to={'../forgot-password'}>Reset password.</Link></p>
          </div>
        </AuthFormContainer>
      </InnerContainer>

      {/* Response message  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </>
  )
}

export default Signin