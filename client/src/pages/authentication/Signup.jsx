import { Button, OutlinedInput, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthFormContainer, CommandButtons, InnerContainer } from '../../components/styled-components/authenticationPages';
import axios from 'axios';

import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = () => {  
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    password: '',
    nationalId: '' 
  });
  const [progress, setProgress] = useState({ value: '', disabled: false});
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''});

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Functions
  const handleChange = ({currentTarget: input}) => { 
    setFormData({...formData, [input.name]: input.value}) 
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };

  const submitForm = (e) => {
    e.preventDefault();

    if (formData.fullName.length <= 3) {
      setResponseMessage({ message: 'Your name must be more than 3 characters long ', severity: 'error' });
      setOpen(true);
      return;
    } else {
      setProgress({ value: 'Signing up ...', disabled: true });

      axios.post(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/user/signup`, formData)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 201) {
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
        <title>Create an account</title>
        <meta name="description" content={`Admin sign up form.`} /> 
      </Helmet>
      <InnerContainer>
        <h2 style={{ textAlign: 'center' }}>Create an account</h2>
        <AuthFormContainer onSubmit={submitForm}>
          
          <TextField id="fullName" style={{ width: '100%' }} minLength='4' size='small' label="Full name" variant="outlined" name='fullName' value={formData.fullName || ''} onChange={handleChange}/>
          <TextField id="email" style={{ width: '100%' }} minLength='8' size='small' label="Email" variant="outlined" name='email' value={formData.email || ''} onChange={handleChange}/>
          <TextField id="phone" style={{ width: '100%' }} minLength='16' maxLength='16' size='small' label="Phone" variant="outlined" name='phone' value={formData.phone || ''} onChange={handleChange}/>
          <TextField id="nationalId" style={{ width: '100%' }} minLength='16' maxLength='16' size='small' label="National Id" variant="outlined" name='nationalId' value={formData.nationalId || ''} onChange={handleChange}/>
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
            {!progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary'>Sign up </Button>}
            {progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary' disabled>{progress.value} </Button>}

            <p>Do you already have an account? <Link style={{color: 'black'}} to={'../signin'}>Sign In Here</Link></p>
          </CommandButtons>
        </AuthFormContainer>
      </InnerContainer>
      
      {/* Response message  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </>
  )
}

export default Signup;