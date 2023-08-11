import React, { useEffect, useState } from 'react'
import { FormContainer } from '../styled-components/formsStyledComponent'
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useParams } from 'react-router-dom';
import { CustomFormControlOne } from '../styled-components/generalComponents';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { APIS } from '../../utils/APIS';
import ResponseComponent from '../sections/ResponseComponent';
import { getProperties } from '../../redux/features/propertySlice';

export default function PublishPropertyForm(props) {
  const { property } = props;

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
    propertyId: '',
    ownerId: '',
    postingTenantId: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    expectedGender: '',
    age: 0,
    expectedAge: 0,
    expectedActivities: '',
  });

  const resetFields = () => {
    setFormData({
      gender: '',
      expectedGender: '',
      age: 0,
      expectedAge: 0,
      expectedActivities: '',
    });
  }

  useEffect(()=> {
    setUser(JSON.parse(localStorage.getItem('usrInfo')));
    setFormData({
      ...formData, 
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      nationalId: user.nationalId,
      propertyId: property._id,
      ownerId: property.ownerId,
      postingTenantId: user.id,
    })
  },[formData, user, params, property])

  const handleFormInputs = event => {
    setFormData({ ...formData, [event.target.name] : event.target.value });
  }

  const submitRequest = e => {
    e.preventDefault();

    console.log(formData);

    if (formData.gender === '') {
      setResponseMessage({ message: 'Your gender must be provided', severity:'error'})
      setOpen(true);
      return;
    } else if (formData.expectedGender === '') {
      setResponseMessage({ message: 'You must provide the expected gender', severity:'error'})
      setOpen(true);
      return;
    } if (formData.age === 0 || formData.age === '') {
      setResponseMessage({ message: 'You must provide your age', severity:'error'})
      setOpen(true);
      return;
    } if (formData.expectedAge === '') {
      setResponseMessage({ message: 'You must provide the expected age for the post', severity:'error'})
      setOpen(true);
      return;
    } else {
      setIsProcessing(true);
      axios.post(APIS.joinPostApis.add, formData)
      .then(response => {
        setTimeout(() => {
          if (response.status === 201) {
            setIsProcessing(false);
            setResponseMessage({ message: 'Join post created', severity:'success'});
            setOpen(true);
            dispatch(getProperties());
            resetFields();
            window.location.replace('/');
          }
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
  }

  return (
    <FormContainer onSubmit={submitRequest} style={{ flexDirection:'column', marginTop: '20px', width: '100%', border: '1px solid #d1e0e0', padding: '20px', borderRadius: '5px', background: 'white' }}>
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
      <CustomFormControlOne sx={{ width: '100%' }} size='small'>
        <InputLabel id="gender">My gender</InputLabel>
        <Select 
          labelId="gender" 
          id="gender" 
          name='gender' 
          value={formData.gender || ''} 
          onChange={handleFormInputs} 
          label="My gender"
        >
          <MenuItem value="">
              <em>None</em>
          </MenuItem>
          <MenuItem value={'male' || ''}>Male</MenuItem>
          <MenuItem value={'female' || ''}>Female</MenuItem>
          <MenuItem value={'prefer not to say' || ''}>Prefer not to say</MenuItem>
        </Select>
      </CustomFormControlOne>
      <CustomFormControlOne sx={{ width: '100%' }} size='small'>
        <InputLabel id="gender">Expected gender</InputLabel>
        <Select 
          labelId="expectedGender" 
          id="expectedGender" 
          name='expectedGender' 
          value={formData.expectedGender || ''} 
          onChange={handleFormInputs} 
          label="Expected gender"
        >
          <MenuItem value="">
              <em>None</em>
          </MenuItem>
          <MenuItem value={'male' || ''}>Male</MenuItem>
          <MenuItem value={'female' || ''}>Female</MenuItem>
          <MenuItem value={'any' || ''}>Any</MenuItem>
        </Select>
      </CustomFormControlOne>
      <TextField 
        type='number' 
        variant='outlined' 
        style={{ width: '100%' }} 
        label='age' 
        id='age' 
        size='small' 
        value={formData.age || ''} 
        name='age' 
        onChange={handleFormInputs}
      />
      <TextField 
        type='text' 
        variant='outlined' 
        style={{ width: '100%' }} 
        label='Expected age' 
        id='expectedAge' 
        size='small' 
        value={formData.expectedAge || ''} 
        name='expectedAge' 
        onChange={handleFormInputs}
        helperText='Provide a range of age. Ex: 20 - 30, or 25 - 27, etc'
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
