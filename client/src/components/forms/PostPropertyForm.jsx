import React, { useEffect, useState } from 'react'
import { CustomFormControlOne, LeftContainer, RightContainer, TwoSidedFormContainer } from '../styled-components/generalComponents'
import { TextField, InputLabel, MenuItem, Select, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { TypesOfOfficeSpaces } from '../../utils/TypesOfOfficeSpaces';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostOfficeSpaceForm() {
  const [userData, setUserData] = useState({});
  const [picture, setPicture] = useState('');
  const [formData, setFormData] = useState({
    officeSpaceType: '',
    location: '',
    mapCoordinates: '',
    description: ''
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
      officeSpaceType: '',
      location: '',
      mapCoordinates: '',
      description: '',
    });
    setPicture('');
    setProgress({ value: '', disabled: false});
  }

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('usrInfo')));
  },[]);

  const handleChange = ({currentTarget: input}) => { 
    setFormData({...formData, [input.name]: input.value}) 
  };

  const handleChangeOfficeSpaceType = (event) => {
    setFormData({...formData, officeSpaceType: event.target.value});
  };

  // const handleChangeFurnished = (event) => {
  //   setFormData({...formData, furnished: event.target.value});
  // };

  const handleFileInput = (e) => {
    setPicture(e.target.files[0]);
  }

  // FORM FOR RECORDING A HOUSE 
  const handleAddOfficeSpace = (e) => {
    e.preventDefault();

    var config = {
      headers: { "Content-Type":"multipart/form-data" }
    };

    var data = formData;
    data.ownerId = userData.id; 
    data.ownerName= userData.fullName;
    data.ownerPhone = userData.phone;

    if (picture) {
      data.picture = picture; 
    }

    // VALIDATION
    if (formData.description === '') {
      setResponseMessage({ message: 'Description for the office space is required.', severity: 'error' });
      setOpen(true);
      return;
    }
    if (formData.officeSpaceType === '') {
      setResponseMessage({ message: 'Office space type must be provided', severity: 'error' });
      setOpen(true);
      return;
    }
    if (!formData.location || formData.location === '') {
      setResponseMessage({ message: 'Apartment location is required', severity: 'error' });
      setOpen(true);
      return;
    } 
    if (!picture || picture === '') {
      setResponseMessage({ message: 'A picture must be provided', severity: 'error' });
      setOpen(true);
      return;
    } 
    if (formData.mapCoordinates === '') {
      setResponseMessage({ message: 'Please provide google map coordinates of the location.', severity: 'error' });
      setOpen(true);
      return;
    } else {
      
      setProgress({ value: 'Processing ...', disabled: true});

      axios.post(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/officeSpace/add` , data, config)
      .then(response => {
        if (response.status === 201) {
          // setResponseMessage({ message: 'Redirecting to payment page', severity: 'success' });
          // setOpen(true);
          setProgress({ value: '', disabled: false });
          window.location.replace('https://book.stripe.com/test_9AQaH5dbydfG03S4gg');
        }
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
    <TwoSidedFormContainer onSubmit={handleAddOfficeSpace} style={{ justifyContent: 'space-around', alignItems:'flex-start',background: 'white', padding: '20px 10px', border: '1px solid #d1e0e0', borderRadius: '5px' }}>
      <LeftContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <TextField id="description" style={{ width: '100%' }} size='small' label="description" multiline rows={4} variant="outlined" name='description' value={formData.description || ''} onChange={handleChange} />
        <CustomFormControlOne style={{ width: '100%' }} size='small'>
          <InputLabel id="officeSpaceType">Apartment Type</InputLabel>
          <Select labelId="officeSpaceType" id="officeSpaceType" name='officeSpaceType' value={formData.officeSpaceType} onChange={handleChangeOfficeSpaceType} label="Apartment Type">
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {TypesOfOfficeSpaces.map((element, index) => {
              return (
                <MenuItem key={index} value={element}>{element}</MenuItem>
              )
            })}
          </Select>
        </CustomFormControlOne>
        <TextField id="location" style={{ width: '100%' }} size='small' label="Location" variant="outlined" name='location' value={formData.location || ''} onChange={handleChange} helperText="Use Districts and Sectors. Example: 'Gasabo, Kacyiru'"/>
      </LeftContainer>
      <RightContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <TextField id="mapCoordinates" style={{ width: '100%' }} size='small' label="Map Coordinates" variant="outlined" name='mapCoordinates' value={formData.mapCoordinates || ''} onChange={handleChange} helperText="Paste or add google map coordinates of the apartment. Example: '-1.951059, 30.094097'"/>
        <TextField type='file' width={'100%'} id="file" style={{ width: '100%' }} size='small' variant="outlined" onChange={handleFileInput} name='pictures' />
        {/* <input type='file' id="file" style={{ width: '100%' }} onChange={handleFileInput} name='pictures' /> */}
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'space-between', alignItems:'center', width: '100%' }}>
          {!progress.disabled && <Button type='submit' variant='contained' size='small' color='primary'>SUBMIT</Button>}
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