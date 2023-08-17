import React, { useEffect, useState } from 'react'
import { LeftContainer, RightContainer, TwoSidedFormContainer } from '../styled-components/generalComponents'
import { TextField, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSlotsForOfficeSpace } from '../../redux/features/slotSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddSlot() {
  const params = useParams();
  const dispatch = useDispatch();
  const [pictures, setPictures] = useState('');
  const [formData, setFormData] = useState({});
  
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
      description: '',
      dimensions: '',
      price: '',
    });
    setPictures('');
    setProgress({ value: '', disabled: false});
  }

  const handleChange = ({currentTarget: input}) => { 
    setFormData({...formData, [input.name]: input.value}) 
  };

  const handleFileInput = (e) => {
    setPictures(e.target.files[0]);
  }

  // FORM FOR RECORDING A HOUSE 
  const handleAddSlot = (e) => {
    e.preventDefault();

    var config = {
      headers: { "Content-Type":"multipart/form-data" }
    };

    var data = formData;
    data.spaceId = params.id; 

    if (pictures) {
      data.pictures = pictures; 
    }

    // VALIDATION
    if (formData.description === '') {
      setResponseMessage({ message: 'Slot description must be provided', severity: 'error' });
      setOpen(true);
      return;
    }
    if (formData.dimension === '') {
      setResponseMessage({ message: 'Slot dimension must be provided', severity: 'error' });
      setOpen(true);
      return;
    }
    if (!formData.price || formData.price === '') {
      setResponseMessage({ message: 'Slot price is required', severity: 'error' });
      setOpen(true);
      return;
    } 
    if (!pictures || pictures === '') {
      setResponseMessage({ message: 'A picture must be provided', severity: 'error' });
      setOpen(true);
      return;
    } 
    
    setProgress({ value: 'Processing ...', disabled: true});

    console.log(data);

    axios.post(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/slot/add` , data, config)
    .then(response => {
      if (response.status === 201) {
        setResponseMessage({ message: response.data.message, severity: 'success' });
        setOpen(true);
        dispatch(getSlotsForOfficeSpace({ spaceId: params.id }))
        setProgress({ value: '', disabled: false });
        resetFields();
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
    <TwoSidedFormContainer onSubmit={handleAddSlot} style={{ alignItems:'flex-start', width: '100%' }}>
      
      <LeftContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <TextField id="description" style={{ width: '100%' }} size='small' label="Descriptions" multiline rows={4} variant="outlined" name='description' value={formData.description || ''} onChange={handleChange} />
        <TextField id="dimensions" style={{ width: '100%' }} size='small' label="Dimensions" variant="outlined" name='dimensions' value={formData.dimensions || ''} onChange={handleChange} />
      </LeftContainer>

      <RightContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <TextField id="price" style={{ width: '100%' }} size='small' label="Slot price" variant="outlined" name='price' value={formData.price || ''} onChange={handleChange} />
        <TextField type='file' width={'100%'} id="file" style={{ width: '100%' }} size='small' variant="outlined" onChange={handleFileInput} name='pictures' />
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