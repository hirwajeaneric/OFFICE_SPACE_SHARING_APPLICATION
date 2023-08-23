import React, { useEffect, useState } from 'react'
import { FormContainer } from '../styled-components/formsStyledComponent'
import { Button, TextField } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRentRequests } from '../../redux/features/rentRequestsSlice';
import axios from 'axios';
import ResponseComponent from '../sections/ResponseComponent';

export default function RentRequestForm() {
  // FORM PROCESSING AND RESPONSE PROVISION
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''});
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const params =  useParams();
  const dispatch = useDispatch();

  // OTHER STATES
  const [user, setUser] = useState({});  
  const [formData, setFormData] = useState({
    slotId: '',
    officeSpaceId: '',
    officeSpaceOwnerId: '',
    requestingUserId: '',
    fullName: '',
    email: '',
    phone: '',
    comment: '',
  });

  const resetFields = () => {
    setFormData({
      gender: '',
      age: 0,
      comment: '',
      nationalId: '',
      passportNumber: '',
      mightNeedToShare: '',
    });
  }

  const { selectedSlot } = useSelector(state => state.slot)

  useEffect(()=> {
    setUser(JSON.parse(localStorage.getItem('usrInfo')));
    setFormData({
      ...formData, 
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      slotId: params.slotId,
    })
  },[formData, user, params])

  const handleFormInputs = event => {
    setFormData({ ...formData, [event.target.name] : event.target.value });
  }

  const submitRequest = e => {
    e.preventDefault();

    formData.requestingUserId = user.id;
    formData.officeSpaceId = params.id;
    formData.slotId = params.slotId;
    formData.ownerId = selectedSlot.ownerId;

    setIsProcessing(true);
    axios.post(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/rentRequest/add`, formData)
    .then(response => {
      setTimeout(() => {
        if (response.status === 201) {
          setIsProcessing(false);
          setResponseMessage({ message: 'Rent request sent', severity:'success'});
          setOpen(true);
          resetFields();
        }
        dispatch(getRentRequests(response.data.rentRequest.requestingUserId));
      },3000);
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }

  return (
    <FormContainer onSubmit={submitRequest} style={{ flexDirection:'column', marginTop: '20px' }}>
      <TextField 
        disabled 
        variant='outlined' 
        style={{ width: '100%' }} 
        label='Full Name' 
        id='fullName' 
        size='small' 
        value={formData.fullName || ''} 
        name='fullName' 
        onChange={handleFormInputs}
      />
      <TextField 
        disabled 
        variant='outlined' 
        style={{ width: '100%' }} 
        label='Email' 
        id='email' 
        size='small' 
        value={formData.email  || ''} 
        name='email' 
        onChange={handleFormInputs}
      />
      <TextField 
        disabled 
        variant='outlined' 
        style={{ width: '100%' }} 
        label='Phone' 
        id='phone' 
        size='small' 
        value={formData.phone  || ''} 
        name='phone' 
        onChange={handleFormInputs}
      />
      {/* <TextField 
        variant='outlined' 
        style={{ width: '100%' }} 
        label='Type of activity' 
        id='activityType' 
        size='small' 
        value={formData.activityType  || ''} 
        name='activityType' 
        onChange={handleFormInputs}
      /> */}
      <TextField 
        id="outlined-multiline-static" 
        style={{ width: '100%' }} 
        label="Activity description" 
        multiline 
        rows={4} 
        name='activityDescription' 
        value={formData.activityDescription || ''} 
        onChange={handleFormInputs} 
      />
      <TextField 
        id="outlined-multiline-static" 
        style={{ width: '100%' }} 
        label="Message" 
        multiline 
        rows={4} 
        name='comment' 
        value={formData.comment || ''} 
        onChange={handleFormInputs} 
      />
      
      <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'space-between', alignItems:'center', width: '100%' }}>
        {!isProcessing && 
          <Button type='submit' variant='contained' size='small' color='primary'>SUBMIT</Button>
        }
        {isProcessing && 
          <Button type='submit' variant='contained' size='medium' color='primary' disabled>PROCESSING...</Button>
        }
        <Button type='cancel' variant='contained' color='secondary' size='small' onClick={resetFields}>CANCEL</Button>
      </div>

        <ResponseComponent 
          message={responseMessage.message} 
          severity={responseMessage.severity}
          open={open} 
          handleClose={handleClose} 
        />
    </FormContainer>
  )
}
