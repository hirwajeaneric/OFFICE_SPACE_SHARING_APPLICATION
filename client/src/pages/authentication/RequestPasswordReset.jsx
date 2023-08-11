import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthFormContainer, InnerContainer } from '../../components/styled-components/authenticationPages';
import { APIS } from '../../utils/APIS';

import { Helmet } from 'react-helmet-async';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RequestPasswordReset = () => {
  
  // States
  const [formData, setFormData] = useState({ email: '', role: 'admin' });
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
  
  // Submit function
  const submitForm = (e) => {
    e.preventDefault();
    const data = {};

    // Setting up the url to call
    var link = APIS.userApis.requestPasswordReset;
    
    // Validation 
    if (formData.email === '') {
      setResponseMessage({ message: 'Email must be provided', severity: 'error' });
      setOpen(true);
      return;
    } else {
      // Set progress message
      setProgress({ value: 'Sending request ...', disabled: true});
      // Api call
      axios.post(link, formData)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 200) {
            setResponseMessage({ message: response.data.message, severity: 'success' });
            setOpen(true); 
            
            // Reset inputs to normal
            setProgress({ value: '', disabled: false });
            setFormData({...formData, email: ''});
            data.email = '';
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
        <title>Forgot Password</title>
        <meta name="description" content={`Forgot password page.`} /> 
      </Helmet>
      <InnerContainer>
        <h2 style={{ textAlign: 'center' }}>Forgot Password?</h2>
        <AuthFormContainer onSubmit={submitForm}>
          <p style={{ textAlign: 'center', padding: '20px', width: '100%', lineHeight:'23px' }}>Do you want to reset your password? Provide the email address you used to sign up.</p>
          
          <TextField id="email" sx={{ width: '100%' }}  size='small' label="email" variant="outlined" name='email' value={formData.email || ''} onChange={handleChange}/>
          
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '20px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {!progress.disabled && <Button type='submit' style={{width: '100%' }} variant='contained' size='medium' color='primary'>Send </Button>}
            {progress.disabled && <Button type='submit' style={{width: '100%' }} variant='contained' size='medium' color='primary' disabled>Sending ... </Button>}

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

export default RequestPasswordReset