import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import { HeaderThree, LeftContainer, RightContainer, TwoSidedContainer } from '../styled-components/generalComponents';
import { useDispatch, useSelector } from 'react-redux';
import { getRentRequestDetails, getRentRequests } from '../../redux/features/rentRequestsSlice';
import axios from 'axios';
import ResponseComponent from '../sections/ResponseComponent';
import { loadStripe } from '@stripe/stripe-js';

export default function RentRequestDetailsForm() {
  
  // FORM PROCESSING AND RESPONSE PROVISION
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [isProcessing3, setIsProcessing3] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''});
  const [open, setOpen] = useState(false);
  const [slotInfo, setSlotInfo] = useState({});
  const params =  useParams();
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const { selectedRentRequest, isLoading } = useSelector((state) => state.rentRequest);

  // OTHER STATES
  const [formData, setFormData] = useState({
    allowedToShare: '',
    response:'',
    status: '',
  });

  // Fetching data on load
  useEffect(() => {
    dispatch(getRentRequestDetails({ rentRequestId: params.rentRequestId}));

    // Fetching rent request and slot info to get price
    axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/rentRequest/findById?id=${params.rentRequestId}`)
    .then(response => {
      if (response.status === 200) {
        axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/slot/findById?id=${response.data.rentRequest.slotId}`)
        .then(response => {
          setSlotInfo(response.data.slot);
        })
        .catch(error => console.error(error))
      }
    })
    .catch(error => console.error(error));

  },[dispatch, params])

  // Form input handler
  const handleFormInputs = event => {
    setFormData({ ...formData, [event.target.name] : event.target.value });
  }


  // Stripe checkout ********************************************************************
  const checkout = async ({price, product}) => {
    const stripePromise = await loadStripe('pk_test_51NMcIBKvflDqv8zXuSuwFuq7kVKzx6mxFKEBvRpW7m4hVIJPxYJZP2L2EyGezcg0xJeJIRvl9vnpBkFqZ9FZ0dpc00zYt2Nbm4');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    
    const data = JSON.stringify({
      price: price,
      product: product,
      slotId: slotInfo._id, 
      userName: selectedRentRequest.fullName.split(' ').join(''),
      userId: selectedRentRequest.requestingUserId,
    })
    
    setIsProcessing3(true);

    axios.post(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/create-checkout-session`, data, config)
    .then(response => {
      const session = response.data;
      stripePromise.redirectToCheckout({ sessionId: session.id });
    })
    .catch(error => console.error(error));
  };

  // Submit rent request response ***************************************************
  const submitRequest = (status) => {
    formData.status = status;

    if (status === 'Accepted') {
      setIsProcessing(true);
    } else if (status === 'Rejected') {
      setIsProcessing2(true);
    }

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
        window.location.reload();
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
        <p><strong>Message:</strong> <span style={{ lineHeight:'25px' }}>{selectedRentRequest.comment}</span></p>
        <p><strong>Line of activity:</strong> <span style={{ lineHeight:'25px' }}>{selectedRentRequest.activityDescription}</span></p>
        <p><strong>Status:</strong> <span>{selectedRentRequest.status}</span></p>
        <p><Link to={`/space/${selectedRentRequest.officeSpaceId}/slot/${selectedRentRequest.slotId}`} style={{ color: 'blue', textDecoration: 'none' }}>View slot</Link></p>
      </LeftContainer>

      <RightContainer style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start' }}>
      {
        selectedRentRequest.requestingUserId === JSON.parse(localStorage.getItem('usrInfo')).id 
        ?
        <div style={{ display:'flex', flexDirection: 'column', gap: '20px', justifyContent:'flex-start', alignItems:'flex-start', width: '100%' }}>
          <p><strong>Status:</strong> <span>{selectedRentRequest.status}</span></p>
          <p><strong>Response:</strong> <span style={{ lineHeight:'25px' }}>{selectedRentRequest.response}</span></p>
          {selectedRentRequest.status === 'Accepted' && <p>
            {!isProcessing3 && 
              <Button onClick={() => { checkout({ price: Number(slotInfo.price), product: `Book slot ${selectedRentRequest.slotId}`})}}>Pay for slot</Button>   
            }
            {isProcessing3 && 
              <Button type='submit' variant='contained' size='medium' color='primary' disabled>PROCESSING...</Button>
            }
          </p>}
        </div> 
        :
        <form style={{ display: 'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start', width: '100%' }}>
          {selectedRentRequest.response && 
            <>
              <HeaderThree style={{ borderBottom: '1px solid gray', width: '100%', marginBottom: '10px', paddingBottom: '10px'}}>Your response</HeaderThree>
              <div style={{ display:'flex', flexDirection: 'column', gap: '20px', justifyContent:'flex-start', alignItems:'flex-start', width: '100%' }}>
                <p><strong>Status:</strong> <span style={{ color: 'gray' }}>{selectedRentRequest.status}</span></p>
                <p><strong>Response:</strong> <span style={{ color: 'gray', lineHeight:'25px' }}>{selectedRentRequest.response}</span></p>
              </div>
              <HeaderThree style={{ borderBottom: '1px solid gray', width: '100%', margin: '10px 0 10px', paddingBottom: '10px'}}>Update response</HeaderThree>
            </>
          }

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
