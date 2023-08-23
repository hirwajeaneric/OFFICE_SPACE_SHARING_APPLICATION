import React, { useEffect, useState } from 'react'
import { CustomFormControlOne, OfficeSpaceDetailsContainer, TopLeftFlexAlignedContainer } from '../styled-components/generalComponents'
import { TextField, InputLabel, MenuItem, Select, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ImageSlider from '../../components/sections/ImageCarousel';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SlotDetailsForm(props) {
  const { formData, setFormData } = props;
  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('usrInfo')));
  },[]);

  const [pictures, setPictures] = useState('');
  
  const [progress, setProgress] = useState({ value: '', disabled: false});
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''})

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChangeSlotStatus = (event) => {
    setFormData({...formData, officeSpaceType: event.target.value});
  };

  const handleFileInput = (e) => {
    setPictures(e.target.files[0]);
  }

  const handleChange = ({currentTarget: input}) => { 
    setFormData({...formData, [input.name]: input.value}) 
  };

  const updateSlot = (e) => {
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

    console.log(config);
    console.log(data);
    console.log(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/slot/update?id=${params.slotId}`);

    setProgress({ value: 'Processing ...', disabled: true});

    axios.put(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/slot/update?id=${params.slotId}`, data, config)
    .then(response => {
      if (response.status === 200) {
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
    <TopLeftFlexAlignedContainer style={{ flexDirection: 'column', width: '100%', justifyContent: 'flex-tart', gap: '20px', paddingBottom: '20px', border: '1px solid #d1e0e0', borderRadius: '5px', background: 'white' }}>
      <OfficeSpaceDetailsContainer>

        <ImageSlider pictures={formData.pictures} />
        
        {formData.ownerId === userData.id
        ?
          <form className="space-details" onSubmit={updateSlot}>
            <div className="left">
              <TextField id="description" style={{ width: '100%' }} size='small' label="description" multiline rows={4} variant="outlined" name='description' value={formData.description || ''} onChange={handleChange} />
              <CustomFormControlOne style={{ width: '100%' }} size='small'>
                <InputLabel id="status">Slot status</InputLabel>
                <Select labelId="Status" id="status" name='status' value={formData.status} onChange={handleChangeSlotStatus} label="Slot status">
                  <MenuItem value="">
                      <em>None</em>
                  </MenuItem>
                  <MenuItem value='available'>Available</MenuItem>
                  <MenuItem value='booked'>Booked</MenuItem>
                  <MenuItem value='unavailable'>Unavailable</MenuItem>
                </Select>
              </CustomFormControlOne>
            <TextField id="dimensions" style={{ width: '100%' }} size='small' label="Dimensions" variant="outlined" name='dimensions' value={formData.dimensions || ''} onChange={handleChange}/>
            </div>
            <div className="right">
              <TextField id="price" style={{ width: '100%' }} size='small' label="Price" variant="outlined" name='price' value={formData.price || ''} onChange={handleChange} />
              <TextField type='file' width={'100%'} id="file" style={{ width: '100%' }} size='small' variant="outlined" onChange={handleFileInput} name='pictures' />
              
              <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'flex-end', alignItems:'flex-end', width: '100%' }}>
                {!progress.disabled && <Button type='submit' variant='contained' size='small' color='primary'>UPDATE</Button>}
                {progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary' disabled>{progress.value}</Button>}
              </div>

            </div>
          </form>
          :
          <div className="space-details">
            <div className="left">
              <p>Description: <span>{formData.description}</span></p>
              <p>Status: <span>{formData.status}</span></p>
            </div>
            <div className="right">
              <p>Dimensions: <span>{formData.dimensions}</span></p>
              <p>Price: <span>{formData.price}</span></p>
            </div>
          </div>
        }
      </OfficeSpaceDetailsContainer>

        

      {/* Response message Snackbar ****************************************************************************************  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </TopLeftFlexAlignedContainer>
  )
}
