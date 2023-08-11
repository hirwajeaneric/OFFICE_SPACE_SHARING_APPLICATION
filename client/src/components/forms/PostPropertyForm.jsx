import React, { useEffect, useState } from 'react'
import { CustomFormControlOne, LeftContainer, RightContainer, TwoSidedFormContainer } from '../styled-components/generalComponents'
import { TextField, InputLabel, MenuItem, Select, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostPropertyForm() {
  const [userData, setUserData] = useState({});
  const [pictures, setPictures] = useState([]);
  const [formData, setFormData] = useState({
    propertyType: '',
    rentPrice: '',
    location: '',
    mapCoordinates: '',
    dimensions: '',
    description: '',
    bedRooms: '',
    bathRooms: '',
    furnished: '',
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
      propertyType: '',
      rentPrice: '',
      location: '',
      mapCoordinates: '',
      dimensions: '',
      description: '',
      bedRooms: '',
      bathRooms: '',
      furnished: '',
    });
    setPictures([]);
    setProgress({ value: '', disabled: false});
  }

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('usrInfo')));
  },[]);

  const handleChange = ({currentTarget: input}) => { 
    setFormData({...formData, [input.name]: input.value}) 
  };

  const handleChangePropertyType = (event) => {
    setFormData({...formData, propertyType: event.target.value});
  };

  const handleChangeFurnished = (event) => {
    setFormData({...formData, furnished: event.target.value});
  };

  const handleFileInput = (e) => {
    setPictures(e.target.files[0]);
  }

  // FORM FOR RECORDING A HOUSE 
  const handleCreateRecord = (e) => {
    e.preventDefault();

    var config = {
      headers: { "Content-Type":"multipart/form-data" }
    };

    var data = formData;
    data.ownerId = userData.id; 
    data.ownerName= userData.fullName;
    data.ownerPhone = userData.phone;
    data.status = 'For Rent';

    if (pictures) {
      data.pictures = pictures; 
    }

    // VALIDATION
    if (formData.propertyType === '') {
      setResponseMessage({ message: 'Apartment type is required', severity: 'error' });
      setOpen(true);
      return;
    } else if (formData.bedRooms === 0 || formData.bedRooms === '') {
      setResponseMessage({ message: 'The number of bedrooms is required', severity: 'error' });
      setOpen(true);
      return;
    } else if (formData.bathRooms === 0 || formData.bathRooms === '') {
      setResponseMessage({ message: 'The number of bathrooms is required', severity: 'error' });
      setOpen(true);
      return;
    } else if (formData.furnished === '') {
      setResponseMessage({ message: 'You must specify is the apartment is furnished or not.', severity: 'error' });
      setOpen(true);
      return;
    } else if (formData.dimensions === 0) {
      setResponseMessage({ message: 'Apartment or house dimensions must be provided', severity: 'error' });
      setOpen(true);
      return;
    } else if (!formData.location || formData.location === '') {
      setResponseMessage({ message: 'Apartment location is required', severity: 'error' });
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
    <TwoSidedFormContainer onSubmit={handleCreateRecord} style={{ justifyContent: 'space-around', alignItems:'flex-start',background: 'white', padding: '20px 10px', border: '1px solid #d1e0e0', borderRadius: '5px' }}>
      <LeftContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <TextField id="description" style={{ width: '100%' }} size='small' label="description" multiline rows={4} variant="outlined" name='description' value={formData.description || ''} onChange={handleChange} />
        <TextField type='number' id="rentPrice" style={{ width: '100%' }} size='small' label="Rent Price" variant="outlined" name='rentPrice' value={formData.rentPrice || ''} onChange={handleChange} helperText="Rent price value should be is in Rwandan Francs. Ex: 100000 "/>
        <TextField id="location" style={{ width: '100%' }} size='small' label="Location" variant="outlined" name='location' value={formData.location || ''} onChange={handleChange} helperText="Use Districts and Sectors. Example: 'Gasabo, Kacyiru'"/>
        <TextField id="mapCoordinates" style={{ width: '100%' }} size='small' label="Map Coordinates" variant="outlined" name='mapCoordinates' value={formData.mapCoordinates || ''} onChange={handleChange} helperText="Paste or add google map coordinates of the apartment. Example: '-1.951059, 30.094097'"/>
      </LeftContainer>
      <RightContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <CustomFormControlOne style={{ width: '100%' }} size='small'>
          <InputLabel id="propertyType">Apartment Type</InputLabel>
          <Select labelId="propertyType" id="propertyType" name='propertyType' value={formData.propertyType} onChange={handleChangePropertyType} label="Apartment Type">
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={'1 Bedroom only'}>1 Bedroom Only</MenuItem>
            <MenuItem value={'1 Bedroom + Living Room'}>1 Bedroom + Living Room</MenuItem>
            <MenuItem value={'2 Bedrooms + Living Room'}>2 Bedrooms + Living Room</MenuItem>
            <MenuItem value={'3 Bedrooms + Living Room'}>3 Bedrooms + Living Room</MenuItem>
            <MenuItem value={'4 Bedrooms + Living Room'}>4 Bedrooms + Living Room</MenuItem>
          </Select>
        </CustomFormControlOne>
        <TextField type='number' id="dimensions" style={{ width: '100%' }} size='small' label="Dimensions" variant="outlined" name='dimensions' value={formData.dimensions || ''} onChange={handleChange} helperText="The dimensions should be in Square Meters." />
        <TextField type='number' id="bedRooms" style={{ width: '100%' }} size='small' label="Bed Rooms" variant="outlined" name='bedRooms' value={formData.bedRooms || ''} onChange={handleChange}/>
        <TextField type='number' id="bathRooms" style={{ width: '100%' }} size='small' label="Bath Rooms" variant="outlined" name='bathRooms' value={formData.bathRooms || ''} onChange={handleChange}/>
        <CustomFormControlOne style={{ width: '100%' }} size='small'>
          <InputLabel id="propertyType">Furnished</InputLabel>
            <Select labelId="furnished" id="furnished" name='furnished' value={formData.furnished} onChange={handleChangeFurnished} label="Furnished">
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={'true'}>Yes</MenuItem>
            <MenuItem value={'false'}>No</MenuItem>
          </Select>
        </CustomFormControlOne>

        {/* <TextField type='file' width={'100%'} id="file" style={{ width: '100%' }} size='small' variant="outlined" onChange={handleFileInput} name='pictures' /> */}
        <input type='file' id="file" style={{ width: '100%' }} onChange={handleFileInput} name='pictures' />
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