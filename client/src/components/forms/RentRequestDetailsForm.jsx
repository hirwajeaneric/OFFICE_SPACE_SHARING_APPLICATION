import React, { useEffect, useState } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import { CustomFormControlOne, HeaderThree, LeftContainer, RightContainer, TwoSidedContainer } from '../styled-components/generalComponents';
import { useDispatch, useSelector } from 'react-redux';
import { getRentRequestDetails, getRentRequests } from '../../redux/features/rentRequestsSlice';
import axios from 'axios';
import { APIS, PROTOCOL } from '../../utils/APIS';
import ResponseComponent from '../sections/ResponseComponent';

export default function RentRequestDetailsForm() {
  
  // FORM PROCESSING AND RESPONSE PROVISION
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
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
  const [formData, setFormData] = useState({
    allowedToShare: '',
    response:'',
    status: '',
  });

  useEffect(() => {
    dispatch(getRentRequestDetails(params.rentRequestId));
  },[dispatch, params])

  const handleFormInputs = event => {
    setFormData({ ...formData, [event.target.name] : event.target.value });
  }

  const submitRequest = (status) => {
    formData.status = status;

    if (status === 'Accepted') {
      setIsProcessing(true);
    } else if (status === 'Rejected') {
      setIsProcessing2(true);
    }

    console.log(formData);
    console.log(APIS.rentRequestApis.update+params.rentRequestId);

    axios.put(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/rentRequest/update?id=${params.rentRequestId}`, formData)
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing(false);
          setIsProcessing2(false);

          dispatch(getRentRequests(JSON.parse(localStorage.getItem('usrInfo')).id));

          setResponseMessage({ message: 'Rent Request Updated', severity:'success'});
          setOpen(true);
        }
        dispatch(getRentRequests(response.data.rentRequest.requestingUserId));
      },3000);
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setIsProcessing2(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }

  const { selectedRentRequest, isLoading } = useSelector((state) => state.rentRequest);

  if (isLoading) {
    return (
      <p style={{ marginTop : '30px' }}>Loading...</p>
    )
  }

  return (
    <TwoSidedContainer style={{ flexDirection:'row', marginTop: '20px', alignItems:'flex-start', width: '100%', background: 'white', border: '1px solid #d1e0e0', padding: '20px', borderRadius: '5px' }}>
      
      <LeftContainer style={{ flexDirection: 'column', gap: '20px', justifyContent:'flex-start', alignItems:'flex-start', marginBottom:'20px' }}>
        <p><strong>Name:</strong> {selectedRentRequest.fullName}</p> 
        <p><strong>Email address:</strong> {selectedRentRequest.email}</p>
        <p><strong>Phone number:</strong> {selectedRentRequest.phone}</p> 
        <p><strong>Gender:</strong> {selectedRentRequest.gender}</p>
        <p><strong>Age:</strong> {selectedRentRequest.age}</p>
        <p><strong>Message:</strong> <span style={{ lineHeight:'25px' }}>{selectedRentRequest.comment}</span></p>
        <p><Link to={`${PROTOCOL}://localhost:5555/property/${selectedRentRequest.propertyId}`} style={{ color: 'blue', textDecoration: 'none' }}>View House</Link></p>
      </LeftContainer>

      <RightContainer style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start' }}>
      {
        selectedRentRequest.requestingUserId === JSON.parse(localStorage.getItem('usrInfo')).id 
        ?
        <div style={{ display:'flex', flexDirection: 'column', gap: '20px', justifyContent:'flex-start', alignItems:'flex-start', width: '100%' }}>
          <p><strong>Allowed to repost:</strong> <span>{selectedRentRequest.allowedToShare}</span></p> 
          <p><strong>Status:</strong> <span>{selectedRentRequest.status}</span></p>
          <p><strong>Response:</strong> <span style={{ lineHeight:'25px' }}>{selectedRentRequest.response}</span></p>
        </div> 
        :
        <form style={{ display: 'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start', width: '100%' }}>
          {selectedRentRequest.response && 
            <>
              <HeaderThree style={{ borderBottom: '1px solid gray', width: '100%', marginBottom: '10px', paddingBottom: '10px'}}>Your response</HeaderThree>
              <div style={{ display:'flex', flexDirection: 'column', gap: '20px', justifyContent:'flex-start', alignItems:'flex-start', width: '100%' }}>
                <p><strong>Allowed to repost:</strong> <span style={{ color: 'gray' }}>{selectedRentRequest.allowedToShare}</span></p> 
                <p><strong>Status:</strong> <span style={{ color: 'gray' }}>{selectedRentRequest.status}</span></p>
                <p><strong>Response:</strong> <span style={{ color: 'gray', lineHeight:'25px' }}>{selectedRentRequest.response}</span></p>
              </div>
              <HeaderThree style={{ borderBottom: '1px solid gray', width: '100%', margin: '10px 0 10px', paddingBottom: '10px'}}>Update response</HeaderThree>
            </>
          }

          <CustomFormControlOne sx={{ width: '100%' }} size='small'>
            <InputLabel id="allowedToShare">Allow user to re-post the property</InputLabel>
            <Select labelId="allowedToShare" id="allowedToShare" name='allowedToShare' value={formData.allowedToShare || ''} onChange={handleFormInputs} label="Allow user to re-post the property">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Yes' || ''}>Yes</MenuItem>
              <MenuItem value={'No' || ''}>No</MenuItem>
            </Select>
          </CustomFormControlOne>

          <TextField id="outlined-multiline-static" style={{ width: '100%' }} label="Response" multiline rows={4} name='response' value={formData.response || ''} onChange={handleFormInputs} />

          {/* DECISION BUTTONS *************************************************************************************/}
          <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'100%'}}>
            <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'flex-start', alignItems:'center', width: '50%' }}>
              {!isProcessing && 
                <Button type='submit' variant='contained' size='small' color='success' onClick={(e) => { e.preventDefault(); submitRequest('Accepted');}}>APPROVE</Button>
              }
              {isProcessing && 
                <Button type='submit' variant='contained' size='medium' color='primary' disabled>PROCESSING...</Button>
              }
            </div>
            <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'flex-end', alignItems:'center', width: '50%' }}>
              {!isProcessing2 && 
                <Button type='submit' variant='contained' size='small' color='secondary' onClick={(e) => { e.preventDefault(); submitRequest('Rejected');}}>REJECT
              </Button>
              }
              {isProcessing2 && 
                <Button type='submit' variant='contained' size='medium' color='primary' disabled>PROCESSING...</Button>
              }
            </div>
          </div>
        </form>}
      </RightContainer>

      <ResponseComponent 
        message={responseMessage.message} 
        severity={responseMessage.severity}
        open={open} 
        handleClose={handleClose} 
      />
    </TwoSidedContainer>
  )
}
