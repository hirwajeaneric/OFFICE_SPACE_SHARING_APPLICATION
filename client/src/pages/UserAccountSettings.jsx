import React, { useState, useEffect} from 'react'
import { Helmet } from 'react-helmet-async'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { HeaderTwo } from '../components/styled-components/generalComponents'
import { PageWithSideMenuContainer } from '../components/styled-components/generalComponents'
import { Button, TextField } from '@mui/material'
import axios from 'axios';
import ResponseComponent from '../components/sections/ResponseComponent';

export default function UserAccountSettings() {
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''});
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    profilePicture:''
  });
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usrInfo'));
    axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/user/findById?id=${user.id}`)
    .then(response => {
      delete response.data.user.password;
      setUserInfo(response.data.user);
    })
    .catch(error => console.log(error));
  },[userInfo.profilePicture])

  const handleProfilePicture = (e) => {
    setUserInfo({...userInfo, profilePicture: e.target.files[0]});
  };

  const handleUserInfoChanges = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const handleUpdate = e => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('usrInfo'));

    var config = {};
    if (!userInfo.profilePicture) {
      config = {}
    } else {
      config = {
        headers: { "Content-Type":"multipart/form-data" }
      }
    }

    setIsProcessing(true);
    axios.put(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/user/update?id=${user.id}`, userInfo, config)
    .then(response => {
      if (response.status === 200) {
        setIsProcessing(false);
        setResponseMessage({ message: 'Account updated!', severity:'success'});
        setOpen(true);
        
        setTimeout(() => {
          window.location.reload();
        },3000);
      }
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }

  const requestPasswordReset = (e) => {
    if (userInfo.email !== '') {
        axios.put(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/user/requestPasswordReset`, { email: userInfo.email })
      .then(response => {
        if (response.status === 200) {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message, severity:'success'});
          setOpen(true);

          setTimeout(() => {
            window.location.replace('/signin');
          },3000);
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setIsProcessing(false);
          setResponseMessage({ message: error.response.data.msg, severity:'error'})
          setOpen(true);
        }
      })
    } else {
      setResponseMessage({ message: 'Please provide the email address you used to login.', severity:'error'})
      setOpen(true);
      return;
    }
  }

  return (
    <>
      <Helmet>
        <title>Account settings</title>
        <meta name="description" content={`User account details.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Settings</HeaderTwo>
        <PageWithSideMenuContainer style={{ backgroundColor: 'white', padding: '20px', marginTop: '20px', borderRadius: '10px', border: '1px solid #d1e0e0' }}>
          <div className='profile-picture'>
            {userInfo.profilePicture ?
            <img src={""+process.env.REACT_APP_SERVERURL+"/api/v1/ossa/profiles/"+userInfo.profilePicture+""} alt='' /> :
            <img src='/imgs/user_avatar_white.png' alt='' />}
            <TextField type='file' name='profilePicture' onChange={handleProfilePicture} size='small' variant='outlined' id='profilePicture' />
          </div>
          <form onSubmit={handleUpdate}>
            <TextField name='fullName' style={{ width: '100%' }} minLength='4' value={userInfo.fullName} onChange={handleUserInfoChanges} label={'Full name'} id='email' size='small' />
            <TextField name='nationalId' style={{ width: '100%' }} minLength='16' maxLength='16' value={userInfo.nationalId} onChange={handleUserInfoChanges} label={'National id'} id='natianalId' size='small' />
            <TextField name='email' style={{ width: '100%' }} value={userInfo.email} onChange={handleUserInfoChanges} label={'Email'} id='email' size='small' />
            <TextField name='phone' style={{ width: '100%' }} minLength='10' maxLength='10' value={userInfo.phone} onChange={handleUserInfoChanges} label={'Phone'} id='phone' size='small' />
            {!isProcessing && 
              <Button type='submit' variant='contained' size='small' color='primary'>EDIT</Button>
            }
            {isProcessing && 
              <Button type='submit' variant='contained' size='medium' color='primary' disabled>PROCESSING...</Button>
            }
            <br /><br /><br />
            <p>Do you want to change your password? Click on the button.</p>
            <Button type='button' variant='text' size='medium' color='primary' onClick={requestPasswordReset}>Request for password reset</Button>
          </form>
        </PageWithSideMenuContainer>
      </InnerContainer>
      <ResponseComponent 
        message={responseMessage.message} 
        severity={responseMessage.severity}
        open={open} 
        handleClose={handleClose} 
      />
    </>
  )
}
