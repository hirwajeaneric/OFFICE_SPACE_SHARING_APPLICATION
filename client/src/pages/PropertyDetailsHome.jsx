import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { FullWidthContainer, HeaderThree, HeaderTwo, PageSizedContainer, PropertyDescriptionSection, SlotsContainer } from '../components/styled-components/generalComponents';
import { PageWithSideBarContainer } from '../components/styled-components/generalComponents';
import ImageSlider from '../components/sections/ImageCarousel';
import PropertyMajorDetails from '../components/sections/PropertyMajorDetails';
import LocationMap from '../components/sections/LocationMap';
import RentRequestForm from '../components/forms/RentRequestForm';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOfficeSpaceDetails } from '../redux/features/officeSpaceSlice';
import PropertyDetailsForm from '../components/forms/PropertyDetailsForm';
import AddSlot from '../components/forms/AddSlot';
import SlotsTable from '../components/tables/SlotsTable';
import axios from 'axios';
import { getSlotsForOfficeSpace } from '../redux/features/slotSlice';
import PropertyDetailsFormHome from '../components/forms/PropertyDetailsFormHome';

export default function PropertyDetailsHome() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ officeSpaceType: '', rentPrice: '', location: '', mapCoordinates: '', dimensions: '', description: '', bedRooms: '', bathRooms: '', furnished: false });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('usrInfo')));
    dispatch(getOfficeSpaceDetails({officeSpaceId: params.id}));

    axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/officeSpace/findById?id=${params.id}`)
    .then(response => {
      setFormData(response.data.officeSpace);
      dispatch(getSlotsForOfficeSpace({ spaceId: params.id }))
    })
    .catch(error => console.log(error));
  },[dispatch, params.id]);


  const { selectedOfficeSpace, isLoading } = useSelector((state) => state.officeSpace);
  const { slotsForOfficeSpace } = useSelector(state => state.slot);

  return (
    <FullWidthContainer>
      <Helmet>
        <title>Office space details</title>
        <meta name="description" content={`Details for office space.`} /> 
      </Helmet>

      <PageSizedContainer style={{ flexDirection: 'column', marginTop:'40px', padding: '0 10px' }}>
        {
          isLoading ? 
          <p style={{ margin:'40px 0' }}>Loading...</p>:
          <>
            {/* Property details  */}
            <PropertyDetailsFormHome formData={formData} setFormData={setFormData}/>    
            
            <LocationMap coordinates={formData.mapCoordinates}/>
            {/* Slots  */}
            <SlotsContainer>
              <div className='header-space'>
                <h3>Slots</h3>
              </div>
              <AddSlot />
              <SlotsTable data={slotsForOfficeSpace} />
            </SlotsContainer>
            <div style={{ display:'flex', flexDirection: 'column', marginBottom: '20px', gap: '5px', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', }}>
              <HeaderThree style={{ marginBgottom: '10px' }}>Owner/Agent</HeaderThree>
              <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Name: <br/><span style={{ color: 'black', fontSize: '100%' }}>{selectedOfficeSpace.ownerName}</span></p>
              <p style={{ fontSize: '90%', color: 'gray', marginBottom: '5px' }}>Phone: <br/><span style={{ color: 'black', fontSize: '100%' }}>{selectedOfficeSpace.ownerPhone}</span></p>
            </div>
      
          </>
        }
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
