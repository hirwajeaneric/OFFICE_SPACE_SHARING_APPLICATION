import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { FullWidthContainer, HeaderTwo, PageSizedContainer, PropertyDescriptionSection } from '../components/styled-components/generalComponents';
import { PageWithSideBarContainer } from '../components/styled-components/generalComponents';
import ImageSlider from '../components/sections/ImageCarousel';
import RentRequestForm from '../components/forms/RentRequestForm';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSlotDetails } from '../redux/features/slotSlice';
import { getOfficeSpaceDetails } from '../redux/features/officeSpaceSlice';

export default function SlotDetailsHome() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [postedByMe, setPostedByMe] = useState(false);


  // FETCH SLOT DETAILS 
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('usrInfo')));
    dispatch(getOfficeSpaceDetails({officeSpaceId: params.id}));
    dispatch(getSlotDetails({slotId: params.slotId}));
  },[dispatch, params.id, params.slotId]);

  const { selectedOfficeSpace } = useSelector((state) => state.officeSpace);
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
              <PropertyDescriptionSection style={{ border: '1px solid #d1e0e0', borderRadius: '5px', padding: '20px', background: 'white' }}>
                <HeaderTwo>Descriptions</HeaderTwo>
                <p>
                  {selectedSlot.description}
                </p>
                <div>
                  <p>Dimensions: <strong>{selectedSlot.dimensions} Square Meters</strong></p>
                  <p>Current status: <strong>{selectedSlot.status}</strong></p>
                </div>
              </PropertyDescriptionSection>
            </div>

            {/* SIDE BAR WITH RENT AND JOIN FORM AND CALL TO ACTION MESSAGES ********************************************************** */}
            
            <div className='rightSide' style={{ border: '1px solid #d1e0e0', borderRadius: '5px', padding: '20px', background: 'white' }}>
            
              {/* This message appears when the selected house is owned by the user who has logen in */}
              {(user !== null && selectedSlot.ownerId === user.id) && <p>Uploaded by you</p>}


              {/* CALL TO ACTION MESSAGES  */}
              {user !== null && selectedSlot.status === 'available' && selectedSlot.ownerId !== user.id ?
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
                !localStorage.getItem('usrTkn') && selectedSlot.status === 'available' ? 
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
                user !== null && selectedSlot.status === 'available' && selectedSlot.ownerId !== user.id ? 
                <RentRequestForm /> : 
                <></>
              }
              
            </div>
          </PageWithSideBarContainer>
        </>}
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
