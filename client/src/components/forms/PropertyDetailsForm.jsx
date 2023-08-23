import React, { useEffect, useState } from 'react'
import { CustomFormControlOne, OfficeSpaceDetailsContainer, TopLeftFlexAlignedContainer } from '../styled-components/generalComponents'
import { TextField, InputLabel, MenuItem, Select, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TypesOfOfficeSpaces } from '../../utils/TypesOfOfficeSpaces';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PropertyDetailsForm(props) {
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

  const handleChangeSlotStatus = (event) => {
    setFormData({...formData, officeSpaceType: event.target.value});
  };

  const handleFileInput = (e) => {
    setPicture(e.target.files[0]);
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
    <TopLeftFlexAlignedContainer onSubmit={handleUpdateProperty} style={{ flexDirection: 'column', width: '100%', justifyContent: 'flex-tart', gap: '20px', paddingBottom: '20px', border: '1px solid #d1e0e0', borderRadius: '5px', background: 'white' }}>
      <OfficeSpaceDetailsContainer>
        <div className="image-container" style={{ background: "url('"+process.env.REACT_APP_SERVERURL+"/api/v1/ossa/spaces/"+formData.picture+"')", backgroundOrigin: 'initial' }}>
          <h3>{`Office space in ${formData.location}`}</h3>
        </div>
        
        {formData.ownerId === userData.id
        ?
          <form className="space-details">
            <div className="left">
              <TextField id="description" style={{ width: '100%' }} size='small' label="description" multiline rows={4} variant="outlined" name='description' value={formData.description || ''} onChange={handleChange} />
              <CustomFormControlOne style={{ width: '100%' }} size='small'>
                <InputLabel id="status">Slot st</InputLabel>
                <Select labelId="Status" id="status" name='status' value={formData.status} onChange={handleChangeSlotStatus} label="Slot status">
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
            <TextField id="location" style={{ width: '100%' }} size='small' label="Location" variant="outlined" name='location' value={formData.location || ''} onChange={handleChange}/>
            </div>
            <div className="right">
              <TextField id="mapCoordinates" style={{ width: '100%' }} size='small' label="Map Coordinates" variant="outlined" name='mapCoordinates' value={formData.mapCoordinates || ''} onChange={handleChange} />
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
              <p>Space type: <span>{formData.officeSpaceType}</span></p>
              <p>Number of slots: <span>{formData.numberOfSlots}</span></p>
              <p>Available slots: <span>{formData.availableSlots}</span></p>
            </div>
            <div className="right">
              <p>Description: <span>{formData.location}</span></p>
              <p>Description: <span>{formData.mapCoordinates}</span></p>
              <p>Description: <span>{formData.lastUpdated}</span></p>
              <p>Description: <span>{formData.ownerName}</span></p>
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
