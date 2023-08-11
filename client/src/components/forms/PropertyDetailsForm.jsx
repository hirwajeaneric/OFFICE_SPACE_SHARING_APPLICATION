import React, { useEffect, useState } from 'react'
import { CustomFormControlOne, LeftContainer, OfficeSpaceDetailsContainer, RightContainer, TwoSidedContainer, TwoSidedFormContainer } from '../styled-components/generalComponents'
import { TextField, InputLabel, MenuItem, Select, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOfficeSpaces } from '../../redux/features/officeSpaceSlice';
import { useParams } from 'react-router-dom';
import { TypesOfOfficeSpaces } from '../../utils/TypesOfOfficeSpaces';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PropertyDetailsForm(props) {
  const { formData, setFormData } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('usrInfo')));
  },[dispatch, params.officeSpaceId]);

  const [picture, setPicture] = useState('');
  
  const [progress, setProgress] = useState({ value: '', disabled: false});
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''})

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChangeOfficeSpaceType = (event) => {
    setFormData({...formData, officeSpaceType: event.target.value});
  };

  const handleFileInput = (e) => {
    setPicture(e.target.files[0]);
  }

  const resetFields = () => {
    setFormData({ propertyType: '', rentPrice: '', location: '', mapCoordinates: '', dimensions: '', description: '', bedRooms: '', bathRooms: '', furnished: '' });
    setPicture({});
  }

  const handleChange = ({currentTarget: input}) => { 
    setFormData({...formData, [input.name]: input.value}) 
  };

  const handleUpdateProperty = (e) => {
    e.preventDefault();

    var config = {};
    var data = formData; 
    delete data['_id'];
    delete data['__v'];

    if (!picture) {
      config = {}
    } else {
      config = {
        headers: { "Content-Type":"multipart/form-data" }
      }
      data.picture = picture;
    }

    setProgress({ value: 'Processing ...', disabled: true});

    axios.put(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/officeSpace/update?id=${params.id}` , data, config)
    .then(response => {
      if (response.status === 200) {
        setResponseMessage({ message: response.data.message, severity: 'success' });
        setOpen(true);
        dispatch(getOfficeSpaces());
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
        {formData.ownerId === userData.id
          ?
          <>
            <OfficeSpaceDetailsContainer>
              <div className="image-container" style={{ backgroundImage: "url("+process.env.REACT_APP_SERVERURL+"/api/v1/ossa/spaces/"+formData.pictures+")" }}></div>
              <div className="space-details">

              </div>
            </OfficeSpaceDetailsContainer>
            {/* <ImageCarousel pictures={formData.pictures} /> */}
            
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
          </>
          :
          <>
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
