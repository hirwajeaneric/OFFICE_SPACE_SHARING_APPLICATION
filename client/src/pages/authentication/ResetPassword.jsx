import { Button, OutlinedInput } from '@mui/material';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthFormContainer, InnerContainer } from '../../components/styled-components/authenticationPages';

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
import { APIS } from '../../utils/APIS';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ResetPassword = () => {
  const params = useParams();
  
  // States
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState({ password: '' });
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

  // Reseting the password
  const submitForm = (e) => {
    e.preventDefault();
    const data = {};
    const { password } = formData;
    data.password = password;

    if (data.password === '') {
      setResponseMessage({ message: 'You must provide a password.', severity: 'error' });
      setOpen(true);
      return;
    } else {
      setProgress({ value: 'Reseting password ...', disabled: true});

      // Setting headers
      const config = {
        headers: { 
          'Authorization' : `Bearer ${params.token}`,
        }
      }

      // API Call
      axios.put(`${APIS.userApis.resetPassword}${params.userId}`, data, config)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 200) {
            setResponseMessage({ message: response.data.message, severity: 'success' });
            setOpen(true);
            setProgress({ value: '', disabled: false });
          }
        }, 2000); 
        setTimeout(()=>{
          window.location.replace('../signin');
        },2000);
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
        <title>Reset Password</title>
        <meta name="description" content={`Change password`} /> 
      </Helmet>

      <InnerContainer>
        <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
        <AuthFormContainer onSubmit={submitForm}>
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

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {!progress.disabled && <Button type='submit' style={{width: '100%' }} variant='contained' size='medium' color='primary'>Update password </Button>}
            {progress.disabled && <Button type='submit' style={{width: '100%' }} variant='contained' size='medium' color='primary' disabled>{progress.value}</Button>}
            <p style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>Do you want to sign in? <Link style={{color: 'black'}} to={'../signin'}>Sign in.</Link></p>
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

export default ResetPassword