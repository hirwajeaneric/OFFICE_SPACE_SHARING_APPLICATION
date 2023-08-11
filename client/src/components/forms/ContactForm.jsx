import React, { useState } from 'react'
import { LeftContainer, RightContainer, TwoSidedFormContainer, HeaderThree } from '../styled-components/generalComponents'
import { Button, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { APIS } from '../../utils/APIS';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    message: '',
  });
  
  const [progress, setProgress] = useState({ value: '', disabled: false});
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''})

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const resetFields = () => {
    setFormData({
      email: '',
      fullName: '',
      message: '',
    });
  }

  const handleChange = ({currentTarget: input}) => { 
    setFormData({...formData, [input.name]: input.value}) 
  };


  // FORM FOR SENDING A MESSAGE 
  const handleCreateRecord = (e) => {
    e.preventDefault();

    // VALIDATION
    if (formData.email === '') {
      setResponseMessage({ message: 'Email is required', severity: 'error' });
      setOpen(true);
      return;
    } else if (formData.fulllName === '') {
      setResponseMessage({ message: 'Your mame is required', severity: 'error' });
      setOpen(true);
      return;
    } else if (formData.message === '') {
      setResponseMessage({ message: 'Please provide a message', severity: 'error' });
      setOpen(true);
      return;
    } else {
      
      var data = formData;

      setProgress({ value: 'Processing ...', disabled: true});

      axios.post(APIS.contact.add , data)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 200) {
            setResponseMessage({ message: 'Message Sent', severity: 'success' });
            setOpen(true);
            setProgress({ value: '', disabled: false });
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
  };

  return (
    <TwoSidedFormContainer onSubmit={handleCreateRecord} style={{ justifyContent: 'space-around', alignItems:'center',background: 'white', padding: '20px 10px', border: '1px solid #d1e0e0', borderRadius: '5px' }}>
      <LeftContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%' }}>
          <img
            style={{ width: '100%'}} 
            src={'/imgs/vecteezy_businessman-calling-customer-support-service-call-center_.jpg'} 
            alt='businessman calling customer support - Resource from vecteezy.com' 
          />  
        </div>
      </LeftContainer>
      <RightContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <HeaderThree>Do you have any query or need support from ISMA Team? Please leave a message.</HeaderThree>
        <TextField id="fullName" style={{ width: '100%' }} size='small' label="Full name" variant="outlined" name='fullName' value={formData.fullName || ''} onChange={handleChange} />
        <TextField id="email" style={{ width: '100%' }} size='small' label="Email" variant="outlined" name='email' value={formData.email || ''} onChange={handleChange} />
        <TextField id="description" style={{ width: '100%' }} size='small' label="description" multiline rows={4} variant="outlined" name='description' value={formData.description || ''} onChange={handleChange} />
        
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'space-between', alignItems:'center', width: '100%' }}>
          {!progress.disabled && <Button type='submit' variant='contained' size='small' color='primary'>SENT MESSAGE</Button>}
          {progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary' disabled>{progress.value}</Button>}
          <Button type='cancel' variant='contained' color='secondary' size='small' onClick={resetFields}>CANCEL</Button>
        </div>
      </RightContainer>
      
      {/* Response message  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </TwoSidedFormContainer>
  )
}