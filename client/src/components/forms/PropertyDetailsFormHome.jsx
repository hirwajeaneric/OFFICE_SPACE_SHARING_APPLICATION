import React, { useEffect, useState } from 'react'
import { OfficeSpaceDetailsContainer, TopLeftFlexAlignedContainer } from '../styled-components/generalComponents'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PropertyDetailsFormHome(props) {
  const { formData, setFormData } = props;
  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('usrInfo')));
  },[params.officeSpaceId]);

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

  const { numberOfSlotsForOfficeSpace, numberOfAvailableSlots } = useSelector(state => state.slot);

  return (
    <TopLeftFlexAlignedContainer onSubmit={handleUpdateProperty} style={{ flexDirection: 'column', width: '100%', justifyContent: 'flex-tart', gap: '20px', paddingBottom: '20px', border: '1px solid #d1e0e0', borderRadius: '5px', background: 'white' }}>
      <OfficeSpaceDetailsContainer>
        <div className="image-container" style={{ background: "url('"+process.env.REACT_APP_SERVERURL+"/api/v1/ossa/spaces/"+formData.picture+"')", backgroundOrigin: 'initial' }}>
          <h3>{`Office space in ${formData.location}`}</h3>
        </div>
        <div className="space-details">
          <div className="left">
            <p>Description: <span>{formData.description}</span></p>
            <p>Space type: <span>{formData.officeSpaceType}</span></p>
            <p>Number of slots: <span>{numberOfSlotsForOfficeSpace}</span></p>
            <p>Available slots: <span>{numberOfAvailableSlots}</span></p>
          </div>
          <div className="right">
            <p>Owner/Agent: <span>{formData.ownerName}</span></p>
            <p>Phone of owner/agent: <span>{formData.ownerPhone}</span></p>
            <p>Uploaded on: <span>{new Date(formData.lastUpdated).toDateString()}</span></p>
          </div>
        </div>
      </OfficeSpaceDetailsContainer>        

      {/* Response message Snackbar ****************************************************************************************  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </TopLeftFlexAlignedContainer>
  )
}
