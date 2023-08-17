import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { FullWidthContainer, HeaderTwo, PageSizedContainer, PropertyDescriptionSection } from '../components/styled-components/generalComponents';
import { PageWithSideBarContainer } from '../components/styled-components/generalComponents';
import ImageSlider from '../components/sections/ImageCarousel';
import PropertyMajorDetails from '../components/sections/PropertyMajorDetails';
import LocationMap from '../components/sections/LocationMap';
import RentRequestForm from '../components/forms/RentRequestForm';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSlotDetails } from '../redux/features/slotSlice';

export default function SlotDetailsHome() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  
  const [user, setUser] = useState({});
  const [postedByMe, setPostedByMe] = useState(false);


  // FETCH SLOT DETAILS 
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('usrInfo')));
    
    dispatch(getSlotDetails({slotId: params.slotId}));
  },[dispatch, params.slotId]);

  const { selectedSlot, isLoading } = useSelector((state) => state.slot);

  return (
    <FullWidthContainer>
      <Helmet>
        <title>Slot details</title>
        <meta name="description" content={`Details for slot.`} /> 
      </Helmet>
      <PageSizedContainer style={{ flexDirection: 'column', marginTop:'40px', padding: '0 10px' }}>
        {
          isLoading ? 
          <p style={{ margin:'40px 0' }}>Loading...</p>:
          <>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <HeaderTwo style={{color: 'black', textAlign:'left'}}><strong>Slot</strong></HeaderTwo>
            <HeaderTwo style={{color: 'red', textAlign:'left', fontSize: '210%'}}><strong>RWF</strong> {selectedSlot.price}</HeaderTwo>
          </div>
          <PageWithSideBarContainer style={{ margin:'40px 0' }}>
            <div className='leftSide'>
              <ImageSlider pictures={selectedSlot.pictures} />
              <PropertyDescriptionSection>
                <HeaderTwo>Description</HeaderTwo>
                <p>
                  {selectedSlot.description}
                </p>
              </PropertyDescriptionSection>
              <PropertyMajorDetails descriptions={selectedSlot} />
              <LocationMap coordinates={selectedSlot.mapCoordinates} />
              
              {/* Information about owner and tenant */}
              <div style={{ border: '1px solid #d1e0e0', display:'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', borderRadius: '5px', padding: '20px', background: 'white' }}>
                {/* Owner info  */}
                {/* <div style={{ display:'flex', flexDirection: 'column', marginBottom: '20px', gap: '5px', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', }}>
                  <HeaderThree style={{ marginBottom: '10px' }}>Owner/Agent</HeaderThree>
                  <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Name: <br/><span style={{ color: 'black', fontSize: '100%' }}>{selectedSlot.ownerName}</span></p>
                  <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Phone: <br/><span style={{ color: 'black', fontSize: '100%' }}>{selectedSlot.ownerPhone}</span></p>
                </div>  */}
              </div>
            </div>

            {/* SIDE BAR WITH RENT AND JOIN FORM AND CALL TO ACTION MESSAGES ********************************************************** */}
            
            <div className='rightSide' style={{ border: '1px solid #d1e0e0', borderRadius: '5px', padding: '20px', background: 'white' }}>
            
              {/* This message appears when the selected house is owned by the user who has logen in */}
              {(user !== null && selectedSlot.ownerId === user.id) && <p>Your House</p>}


              {/* CALL TO ACTION MESSAGES  */}
              {user !== null && selectedSlot.status === 'For Rent' && selectedSlot.ownerId !== user.id ?
                <>
                  <HeaderTwo>Do you want to Rent this Apartment?</HeaderTwo>
                  <p style={{ fontWeight: '400', margin: '20px 0', lineHeight: '23px' }}>Fill in the form bellow to reserve the permission to rent this Apartment.</p>
                </>
                :
                user !== null && selectedSlot.status === 'For Join' && selectedSlot.ownerId !== user.id && !postedByMe ?
                <>
                  <HeaderTwo>Do you want to Join this Apartment?</HeaderTwo>
                  <p style={{ fontWeight: '400', margin: '20px 0', lineHeight: '23px' }}>Fill in the form bellow to send a join request.</p>
                </>
                :
                <></>  
              }

              {/* CONDITIONS TO DISPLAY RENT FORM */}
              {
                !localStorage.getItem('usrTkn') && selectedSlot.status === 'For Rent' ? 
                <Button 
                  type='button' 
                  variant='contained' 
                  color='primary' 
                  size='small' 
                  style={{ marginBottom: '20px' }} 
                  onClick={() => navigate('/signin')}>
                    Sign in to Rent Apartment
                </Button> : 
                <></>
              }

              {
                user !== null && selectedSlot.status === 'For Rent' && selectedSlot.ownerId !== user.id ? 
                <RentRequestForm /> : 
                <></>
              }

              {/* CONDITIONS FOR JOIN FORM  */}
              
              {
                !localStorage.getItem('usrTkn') && selectedSlot.status === 'For Join' ? 
                <Button 
                  type='button' 
                  variant='contained' 
                  color='secondary' 
                  size='small' 
                  onClick={() => navigate('/signin')}>
                    Sign in to Join Apartment
                </Button> : 
                <></>
              }
              
            </div>
          </PageWithSideBarContainer>
        </>}
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
