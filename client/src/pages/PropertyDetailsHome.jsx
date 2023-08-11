import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { FullWidthContainer, HeaderThree, HeaderTwo, PageSizedContainer, PropertyDescriptionSection } from '../components/styled-components/generalComponents';
import { PageWithSideBarContainer } from '../components/styled-components/generalComponents';
import ImageSlider from '../components/sections/ImageCarousel';
import PropertyMajorDetails from '../components/sections/PropertyMajorDetails';
import LocationMap from '../components/sections/LocationMap';
import RentRequestForm from '../components/forms/RentRequestForm';
import JoinRequestForm from '../components/forms/JoinRequestForm';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetails } from '../redux/features/propertySlice';
import axios from 'axios';
import { APIS } from '../utils/APIS';

export default function PropertyDetailsHome() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  
  const [joinPost, setJoinPost] = useState({}); 
  const [user, setUser] = useState({});
  const [postedByMe, setPostedByMe] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('usrInfo')));
    
    dispatch(getPropertyDetails(params.id));
  },[dispatch, params.id]);

  useEffect(() => {
    
  },[])

  // Fetch Join post
  useEffect(() => {
    axios.get(APIS.joinPostApis.findByPropertyId+params.id)
    .then(response => {
      setJoinPost(response.data.joinPost);
      if (user !== null && response.data.joinPost.postingTenantId === user.id) {
        setPostedByMe(true);
        return;
      }
    })
    .catch(error => console.log(error));
  },[params.id, user]);

  const { selectedProperty, isLoading } = useSelector((state) => state.property);

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
            <HeaderTwo style={{color: 'black', textAlign:'left'}}><strong>Apartment {selectedProperty.status} in {selectedProperty.location}</strong></HeaderTwo>
            <HeaderTwo style={{color: 'red', textAlign:'left', fontSize: '210%'}}><strong>RWF</strong> {selectedProperty.rentPrice}</HeaderTwo>
          </div>
          <PageWithSideBarContainer style={{ margin:'40px 0' }}>
            <div className='leftSide'>
              <ImageSlider pictures={selectedProperty.pictures} />
              <PropertyDescriptionSection>
                <HeaderTwo>Description</HeaderTwo>
                <p>
                  {selectedProperty.description}
                </p>
              </PropertyDescriptionSection>
              <PropertyMajorDetails descriptions={selectedProperty} />
              <LocationMap coordinates={selectedProperty.mapCoordinates} />
              
              {/* Information about owner and tenant */}
              <div style={{ border: '1px solid #d1e0e0', display:'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', borderRadius: '5px', padding: '20px', background: 'white' }}>
                {/* Owner info  */}
                <div style={{ display:'flex', flexDirection: 'column', marginBottom: '20px', gap: '5px', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', }}>
                  <HeaderThree style={{ marginBottom: '10px' }}>Owner/Agent</HeaderThree>
                  <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Name: <br/><span style={{ color: 'black', fontSize: '100%' }}>{selectedProperty.ownerName}</span></p>
                  <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Phone: <br/><span style={{ color: 'black', fontSize: '100%' }}>{selectedProperty.ownerPhone}</span></p>
                </div>

                {/* Tenant info  */}
                {(selectedProperty.tenants && selectedProperty.tenants.length !== 0) && <HeaderThree>Tenants</HeaderThree>}
                <div style={{ display:'flex', flexDirection: 'row', gap: '20px', margin:'20px 0', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', }}>
                  {(selectedProperty.tenants && selectedProperty.tenants.length !== 0) && selectedProperty.tenants.map((tenant, index) => {
                    return (
                      <div key={index} style={{ display:'flex', flexDirection: 'column', gap: '5px', justifyContent:'flex-start', alignItems: 'flex-start', width: '30%', }}>
                        <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Name: <br/><span style={{ color: 'black', fontSize: '100%' }}>{tenant.fullName}</span></p>
                        <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Phone: <br/><span style={{ color: 'black', fontSize: '100%' }}>{tenant.email}</span></p>
                      </div>
                    )
                  })}
                </div>
                
              </div>
            </div>

            {/* SIDE BAR WITH RENT AND JOIN FORM AND CALL TO ACTION MESSAGES ********************************************************** */}
            
            <div className='rightSide' style={{ border: '1px solid #d1e0e0', borderRadius: '5px', padding: '20px', background: 'white' }}>
              {/* Join post */}
              {
                joinPost && 
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #d1e0e0', width: '100%' }}>
                  <HeaderTwo>Join Post</HeaderTwo>
                  <p style={{ lineHeight: '22px', marginTop: '20px' }}>Bellow are requirements that a joining user needs to be fulfilling to apply or send a join request.</p>
                  <p style={{ fontSize: '90%', color: 'black', margin: '10px 0 20px' }}>Posted on: <span style={{ fontSize: '90%', color: 'gray' }}>{new Date(joinPost.postDate).toUTCString()}</span></p>
                  <div style={{ background: '#f0f5f5', padding: '10px 10px', borderRadius: '5px', border: '1px solid #d1e0e0' }}>
                    {joinPost.expectedAge && 
                      <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Expected age: <br/><span style={{ color: 'black', fontSize: '100%' }}>{joinPost.expectedAge}</span></p>}
                    {joinPost.expectedGender && 
                      <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Expected gender: <br/><span style={{ color: 'black', fontSize: '100%' }}>{joinPost.expectedGender}</span></p>}
                    {joinPost.comment && 
                      <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Comment: <br/><span style={{ color: 'black', fontSize: '100%' }}>{joinPost.comment}</span></p>}
                    {joinPost.comment && 
                      <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Expected activities: <br/><span style={{ color: 'black', fontSize: '100%' }}>{joinPost.comment}</span></p>}
                  </div>
                </div>
              }


              {/* This message appears when the selected house is owned by the user who has logen in */}
              {(user !== null && selectedProperty.ownerId === user.id) && <p>Your House</p>}


              {/* CALL TO ACTION MESSAGES  */}
              {user !== null && selectedProperty.status === 'For Rent' && selectedProperty.ownerId !== user.id ?
                <>
                  <HeaderTwo>Do you want to Rent this Apartment?</HeaderTwo>
                  <p style={{ fontWeight: '400', margin: '20px 0', lineHeight: '23px' }}>Fill in the form bellow to reserve the permission to rent this Apartment.</p>
                </>
                :
                user !== null && selectedProperty.status === 'For Join' && selectedProperty.ownerId !== user.id && !postedByMe ?
                <>
                  <HeaderTwo>Do you want to Join this Apartment?</HeaderTwo>
                  <p style={{ fontWeight: '400', margin: '20px 0', lineHeight: '23px' }}>Fill in the form bellow to send a join request.</p>
                </>
                :
                <></>  
              }

              {/* CONDITIONS TO DISPLAY RENT FORM */}
              {
                !localStorage.getItem('usrTkn') && selectedProperty.status === 'For Rent' ? 
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
                user !== null && selectedProperty.status === 'For Rent' && selectedProperty.ownerId !== user.id ? 
                <RentRequestForm /> : 
                <></>
              }

              {/* CONDITIONS FOR JOIN FORM  */}
              
              {
                !localStorage.getItem('usrTkn') && selectedProperty.status === 'For Join' ? 
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
              
              {
                user !== null && selectedProperty.status === 'For Join' && selectedProperty.ownerId !== user.id && !postedByMe ? 
                <JoinRequestForm joinPostId={joinPost._id} propertyOwnerId={selectedProperty.ownerId} postingTenant={selectedProperty.tenants[0].id} /> : 
                <></>
              }
            </div>
          </PageWithSideBarContainer>
        </>}
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
