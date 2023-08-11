import React, { useState } from 'react'
import { CustomFormControlOne, LeftContainer, RightContainer, TwoSidedContainer, TwoSidedFormContainer } from '../styled-components/generalComponents'
import { TextField, InputLabel, MenuItem, Select, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { APIS } from '../../utils/APIS';
import { useDispatch } from 'react-redux';
import { getProperties } from '../../redux/features/propertySlice';
import { useParams } from 'react-router-dom';
import ImageCarousel from '../sections/ImageCarousel';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PropertyDetailsForm(props) {
  const { formData, setFormData, userData } = props;

  const dispatch = useDispatch();
  const params = useParams();
  
  const [pictures, setPictures] = useState([]);
  
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
    setFormData({ propertyType: '', rentPrice: '', location: '', mapCoordinates: '', dimensions: '', description: '', bedRooms: '', bathRooms: '', furnished: '' });
    setPictures([]);
  }

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

  const handleUpdateProperty = (e) => {
    e.preventDefault();

    var config = {};
    var data = formData; 
    delete data['_id'];
    delete data['__v'];

    if (!pictures) {
      config = {}
    } else {
      config = {
        headers: { "Content-Type":"multipart/form-data" }
      }
      data.pictures = pictures;
    }

    setProgress({ value: 'Processing ...', disabled: true});

    axios.put(APIS.propertyApis.update+params.propertyId , data, config)
    .then(response => {
      if (response.status === 200) {
        setResponseMessage({ message: response.data.message, severity: 'success' });
        setOpen(true);
        dispatch(getProperties());
        setProgress({ value: '', disabled: false });
        window.location.reload();
      }
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setResponseMessage({ message: error.response.data.msg, severity: 'error' });
        setOpen(true);
        setProgress({ value: '', disabled: false });
      }
    });
  };

  return (
    <TwoSidedFormContainer onSubmit={handleUpdateProperty} style={{ flexDirection: 'column', width: '100%', justifyContent: 'flex-tart', gap: '20px', border: '1px solid #d1e0e0', padding: '20px', borderRadius: '5px', background: 'white' }}>
        {formData.ownerId !== userData.id
          ?
          <>
            <ImageCarousel pictures={formData.pictures} />
            <TextField 
              disabled
              id="description" 
              style={{ width: '100%' }} 
              size='small' 
              label="Description" 
              multiline 
              rows={4} 
              variant="outlined" 
              name='description' 
              value={formData.description || ''} 
              onChange={handleChange} 
            />
            <TwoSidedContainer style={{ alignItems:'flex-start', gap: '20px'}}>
              <LeftContainer >
                <TextField 
                  disabled
                  type='number' 
                  id="rentPrice" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Rent Price" 
                  variant="outlined" 
                  name='rentPrice' 
                  value={formData.rentPrice || ''} 
                  onChange={handleChange}
                />
              </LeftContainer>
              <RightContainer>
                <TextField 
                  disabled
                  id="location" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Location" 
                  variant="outlined" 
                  name='location' 
                  value={formData.location || ''} 
                  onChange={handleChange} 
                  helperText="Use Districts and Sectors. Example: 'Gasabo, Kacyiru'"
                />
              </RightContainer>
            </TwoSidedContainer>
            <TextField 
              disabled
              id="mapCoordinates" 
              style={{ width: '100%' }} 
              size='small' 
              label="Map Coordinates" 
              variant="outlined" 
              name='mapCoordinates' 
              value={formData.mapCoordinates || ''} 
              onChange={handleChange} 
              helperText="Paste or add google map coordinates of the apartment. Example: '-1.951059, 30.094097'"
            />
            <TwoSidedContainer style={{ alignItems:'flex-start', gap: '20px'}}>
              <LeftContainer>
                <CustomFormControlOne style={{ width: '100%' }} size='small'>
                  <InputLabel id="propertyType">Apartment Type</InputLabel>
                  <Select 
                    disabled
                    labelId="propertyType" 
                    id="propertyType" 
                    name='propertyType' 
                    value={formData.propertyType} 
                    onChange={handleChangePropertyType} 
                    label="Apartment Type"
                  >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'1 Bedroom Only'}>1 Bedroom Only</MenuItem>
                    <MenuItem value={'1 Bedroom + Living Room'}>1 Bedroom + Living Room</MenuItem>
                    <MenuItem value={'2 Bedrooms + Living Room'}>2 Bedrooms + Living Room</MenuItem>
                    <MenuItem value={'3 Bedrooms + Living Room'}>3 Bedrooms + Living Room</MenuItem>
                    <MenuItem value={'4 Bedrooms + Living Room'}>4 Bedrooms + Living Room</MenuItem>
                  </Select>
                </CustomFormControlOne>
              </LeftContainer>
              <RightContainer>
                <TextField 
                  disabled
                  type='number' 
                  id="dimensions" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Dimensions" 
                  variant="outlined" 
                  name='dimensions' 
                  value={formData.dimensions || ''} 
                  onChange={handleChange} 
                  helperText="The dimensions should be in Square Meters." 
                />
              </RightContainer>
            </TwoSidedContainer>
            <TwoSidedContainer style={{ alignItems:'flex-start', gap: '20px'}}>
              <LeftContainer>
                <TextField 
                  disabled
                  type='number' 
                  id="bedRooms" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Bed Rooms" 
                  variant="outlined" 
                  name='bedRooms' 
                  value={formData.bedRooms || ''} 
                  onChange={handleChange}
                />
              </LeftContainer>
              <RightContainer>
                <TextField 
                  disabled
                  type='number' 
                  id="bathRooms" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Bath Rooms" 
                  variant="outlined" 
                  name='bathRooms' 
                  value={formData.bathRooms || ''} 
                  onChange={handleChange}
                />
              </RightContainer>
            </TwoSidedContainer>
            <TwoSidedContainer style={{ alignItems:'flex-start', gap: '20px'}}>
              <LeftContainer>
                <CustomFormControlOne style={{ width: '100%' }} size='small'>
                  <InputLabel id="propertyType">Furnished</InputLabel>
                    <Select disabled labelId="furnished" id="furnished" name='furnished' value={formData.furnished} onChange={handleChangeFurnished} label="Furnished">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </CustomFormControlOne>      
              </LeftContainer>
            </TwoSidedContainer>
          </>
          :
          <>
            <ImageCarousel pictures={formData.pictures}/>
            <TextField 
              id="description" 
              style={{ width: '100%' }} 
              size='small' 
              label="Description" 
              multiline 
              rows={4} 
              variant="outlined" 
              name='description' 
              value={formData.description || ''} 
              onChange={handleChange} 
            />
            <TwoSidedContainer style={{ alignItems:'flex-start', gap: '20px'}}>
              <LeftContainer >
                <TextField 
                  type='number' 
                  id="rentPrice" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Rent Price" 
                  variant="outlined" 
                  name='rentPrice' 
                  value={formData.rentPrice || ''} 
                  onChange={handleChange}
                />
              </LeftContainer>
              <RightContainer>
                <TextField 
                  id="location" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Location" 
                  variant="outlined" 
                  name='location' 
                  value={formData.location || ''} 
                  onChange={handleChange} 
                  helperText="Use Districts and Sectors. Example: 'Gasabo, Kacyiru'"
                />
              </RightContainer>
            </TwoSidedContainer>
            <TextField 
              id="mapCoordinates" 
              style={{ width: '100%' }} 
              size='small' 
              label="Map Coordinates" 
              variant="outlined" 
              name='mapCoordinates' 
              value={formData.mapCoordinates || ''} 
              onChange={handleChange} 
              helperText="Paste or add google map coordinates of the apartment. Example: '-1.951059, 30.094097'"
            />
            <TwoSidedContainer style={{ alignItems:'flex-start', gap: '20px'}}>
              <LeftContainer>
                <CustomFormControlOne style={{ width: '100%' }} size='small'>
                  <InputLabel id="propertyType">Apartment Type</InputLabel>
                  <Select 
                    labelId="propertyType" 
                    id="propertyType" 
                    name='propertyType' 
                    value={formData.propertyType} 
                    onChange={handleChangePropertyType} 
                    label="Apartment Type"
                  >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'1 Bedroom Only'}>1 Bedroom Only</MenuItem>
                    <MenuItem value={'1 Bedroom + Living Room'}>1 Bedroom + Living Room</MenuItem>
                    <MenuItem value={'2 Bedrooms + Living Room'}>2 Bedrooms + Living Room</MenuItem>
                    <MenuItem value={'3 Bedrooms + Living Room'}>3 Bedrooms + Living Room</MenuItem>
                    <MenuItem value={'4 Bedrooms + Living Room'}>4 Bedrooms + Living Room</MenuItem>
                  </Select>
                </CustomFormControlOne>
              </LeftContainer>
              <RightContainer>
                <TextField 
                  type='number' 
                  id="dimensions" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Dimensions" 
                  variant="outlined" 
                  name='dimensions' 
                  value={formData.dimensions || ''} 
                  onChange={handleChange} 
                  helperText="The dimensions should be in Square Meters." 
                />
              </RightContainer>
            </TwoSidedContainer>
            <TwoSidedContainer style={{ alignItems:'flex-start', gap: '20px'}}>
              <LeftContainer>
                <TextField 
                  type='number' 
                  id="bedRooms" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Bed Rooms" 
                  variant="outlined" 
                  name='bedRooms' 
                  value={formData.bedRooms || ''} 
                  onChange={handleChange}
                />
              </LeftContainer>
              <RightContainer>
                <TextField 
                  type='number' 
                  id="bathRooms" 
                  style={{ width: '100%' }} 
                  size='small' 
                  label="Bath Rooms" 
                  variant="outlined" 
                  name='bathRooms' 
                  value={formData.bathRooms || ''} 
                  onChange={handleChange}
                />
              </RightContainer>
            </TwoSidedContainer>
            <TwoSidedContainer style={{ alignItems:'flex-start', gap: '20px'}}>
              <LeftContainer>
                <CustomFormControlOne style={{ width: '100%' }} size='small'>
                  <InputLabel id="propertyType">Furnished</InputLabel>
                    <Select labelId="furnished" id="furnished" name='furnished' value={formData.furnished} onChange={handleChangeFurnished} label="Furnished">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </CustomFormControlOne>      
              </LeftContainer>
              <RightContainer>
                <input 
                  style={{ width: '100%'}}
                  type='file' 
                  id="file" 
                  onChange={handleFileInput} 
                  name='pictures' 
                />
              </RightContainer>
            </TwoSidedContainer>
          </>
        }

        {/* COMMAND BUTTONS ************************************************************************************************ */}
        {formData.ownerId !== userData.id ? 
          <></> :
          <>
            <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'space-between', alignItems:'center', width: '100%' }}>
              {!progress.disabled && 
                <Button 
                  type='submit' 
                  variant='contained' 
                  size='small' 
                  color='primary'>
                    CONFIRM UPDATES
                </Button>
              }
              {progress.disabled && 
                <Button 
                  type='submit' 
                  variant='contained' 
                  size='medium' 
                  color='primary' 
                  disabled>
                    {progress.value}
                </Button>
              }
              <Button 
                type='cancel' 
                variant='contained' 
                color='secondary' 
                size='small' 
                onClick={resetFields}>
                  CANCEL
              </Button>
            </div>
          </>
        }

      {/* Response message Snackbar ****************************************************************************************  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </TwoSidedFormContainer>
  )
}
