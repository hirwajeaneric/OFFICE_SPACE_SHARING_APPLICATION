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

const inputFieldStyles = {
  width: '100%', 
  padding: '8px 12px', 
  borderRadius: '5px', 
  fontSize: '100%', 
  border: '1px solid gray', 
  marginBottom: '10px'
}

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
    data.ownerId = JSON.parse(localStorage.getItem('usrInfo')).id;

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
    <>
      <form onSubmit={handleAddSlot} style={{ display: 'flex', flexDirection: 'row', alignItems:'flex-start', width: '100%' }}>
        <div className='left'>
          <textarea 
            id="description" 
            style={inputFieldStyles} 
            placeholder="Descriptions" 
            rows={4} 
            name='description' 
            value={formData.description || ''} 
            onChange={handleChange} 
          >
          </textarea>
          <input 
            type='text' 
            style={inputFieldStyles} 
            placeholder='Dimensions' 
            id="dimensions" 
            name='dimensions' 
            value={formData.dimensions || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className='right'>
          <input 
            type='text' 
            style={inputFieldStyles} 
            placeholder='Price' 
            id="price" 
            name='price' 
            value={formData.price || ''} 
            onChange={handleChange} 
          />
          <input 
            type='file' 
            style={inputFieldStyles} 
            onChange={handleFileInput} 
            name='pictures' 
          />
          <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'space-between', alignItems:'center', width: '100%' }}>
            {!progress.disabled && 
              <Button type='submit' variant='contained' size='small' color='primary'>SUBMIT</Button>
            }
            {progress.disabled && 
              <Button type='submit' variant='contained' size='medium' color='primary' disabled>{progress.value}</Button>
            }
            <Button type='cancel' variant='contained' color='secondary' size='small' onClick={resetFields}>CANCEL</Button>
          </div>
        </div>
      </form>

      {/* Response message  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </>
  )
}