import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { FullWidthContainer, HeaderThree, HeaderTwo, PageSizedContainer, PropertyDescriptionSection } from '../components/styled-components/generalComponents';
import { PageWithSideBarContainer } from '../components/styled-components/generalComponents';
import ImageSlider from '../components/sections/ImageCarousel';
import PropertyMajorDetails from '../components/sections/PropertyMajorDetails';
import LocationMap from '../components/sections/LocationMap';
import RentRequestForm from '../components/forms/RentRequestForm';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOfficeSpaceDetails } from '../redux/features/officeSpaceSlice';

export default function PropertyDetailsHome() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('usrInfo')));
    
    dispatch(getOfficeSpaceDetails({officeSpaceId: params.id}));
  },[dispatch, params.id]);


  const { selectedOfficeSpace, isLoading } = useSelector((state) => state.officeSpace);

  return (
    <FullWidthContainer>
      <Helmet>
        <title>Property details</title>
        <meta name="description" content={`Details for property number: ${params.propertyId}.`} /> 
      </Helmet>
      <PageSizedContainer style={{ flexDirection: 'column', marginTop:'40px', padding: '0 10px' }}>
        {
          isLoading ? 
          <p style={{ margin:'40px 0' }}>Loading...</p>:
          <>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <HeaderTwo style={{color: 'black', textAlign:'left'}}><strong>Office space for {selectedOfficeSpace.officeSpaceType} in {selectedOfficeSpace.location}</strong></HeaderTwo>
            <HeaderTwo style={{color: 'red', textAlign:'left', fontSize: '210%'}}><strong>RWF</strong> {selectedOfficeSpace.price}</HeaderTwo>
          </div>
          <PageWithSideBarContainer style={{ margin:'40px 0' }}>
            <div className='leftSide'>
              {/* <ImageSlider pictures={selectedOfficeSpace.picture} /> */}
              <img src={`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/spaces/${selectedOfficeSpace.picture}`} alt='' style={{ width: '100%'}}/>
              <PropertyDescriptionSection>
                <HeaderTwo>Description</HeaderTwo>
                <p>
                  {selectedOfficeSpace.description}
                </p>
              </PropertyDescriptionSection>
              <PropertyMajorDetails descriptions={selectedOfficeSpace} />
              <LocationMap coordinates={selectedOfficeSpace.mapCoordinates} />
              
              {/* Information about owner and tenant */}
              <div style={{ border: '1px solid #d1e0e0', display:'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', borderRadius: '5px', padding: '20px', background: 'white' }}>
                {/* Owner info  */}
                <div style={{ display:'flex', flexDirection: 'column', marginBottom: '20px', gap: '5px', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', }}>
                  <HeaderThree style={{ marginBottom: '10px' }}>Owner/Agent</HeaderThree>
                  <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Name: <br/><span style={{ color: 'black', fontSize: '100%' }}>{selectedOfficeSpace.ownerName}</span></p>
                  <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Phone: <br/><span style={{ color: 'black', fontSize: '100%' }}>{selectedOfficeSpace.ownerPhone}</span></p>
                </div>
                
              </div>
            </div>

            {/* SIDE BAR WITH RENT AND JOIN FORM AND CALL TO ACTION MESSAGES ********************************************************** */}
            
            <div className='rightSide' style={{ border: '1px solid #d1e0e0', borderRadius: '5px', padding: '20px', background: 'white' }}>
              
              {/* This message appears when the selected house is owned by the user who has logen in */}
              {/* {(user !== null && selectedOfficeSpace.ownerId === user.id) && <p>Your slot</p>} */}


              {/* CALL TO ACTION MESSAGES  */}
              {/* {user !== null && selectedOfficeSpace.ownerId !== user.id ?
                <>
                  <HeaderTwo>Do you want to Rent this slot?</HeaderTwo>
                  <p style={{ fontWeight: '400', margin: '20px 0', lineHeight: '23px' }}>Fill in the form bellow to reserve the permission to rent this Apartment.</p>
                </>
                :
                <></>  
              } */}

              {/* CONDITIONS TO DISPLAY RENT FORM */}
              {/* {
                !localStorage.getItem('usrTkn') && selectedOfficeSpace.status === 'For Rent' ? 
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
                user !== null && selectedOfficeSpace.status === 'For Rent' && selectedOfficeSpace.ownerId !== user.id ? 
                <RentRequestForm /> : 
                <></>
              } */}
            </div>
          </PageWithSideBarContainer>
        </>}
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
