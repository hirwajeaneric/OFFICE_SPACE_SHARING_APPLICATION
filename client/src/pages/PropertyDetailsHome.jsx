import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomPropertyCard, FullWidthContainer, HeaderThree, HeaderTwo, PageSizedContainer, PropertyDescriptionSection, SlotsContainer, TopLeftFlexAlignedContainer } from '../components/styled-components/generalComponents';
import { PageWithSideBarContainer } from '../components/styled-components/generalComponents';
import ImageSlider from '../components/sections/ImageCarousel';
import PropertyMajorDetails from '../components/sections/PropertyMajorDetails';
import LocationMap from '../components/sections/LocationMap';
import RentRequestForm from '../components/forms/RentRequestForm';
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOfficeSpaceDetails } from '../redux/features/officeSpaceSlice';
import PropertyDetailsForm from '../components/forms/PropertyDetailsForm';
import AddSlot from '../components/forms/AddSlot';
import SlotsTable from '../components/tables/SlotsTable';
import axios from 'axios';
import { getSlotsForOfficeSpace } from '../redux/features/slotSlice';
import PropertyDetailsFormHome from '../components/forms/PropertyDetailsFormHome';
import { LocationOn, PriceChange } from '@mui/icons-material';
import { MdOutlinePriceChange } from 'react-icons/md';

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
  const { slotsForOfficeSpace, numberOfSlotsForOfficeSpace } = useSelector(state => state.slot);

  return (
    <FullWidthContainer>
      <Helmet>
        <title>Office space details</title>
        <meta name="description" content={`Details for office space.`} /> 
      </Helmet>

      <PageSizedContainer style={{ flexDirection: 'column', marginTop:'40px', padding: '0 10px', gap: '20px' }}>
        {
          isLoading ? 
          <p style={{ margin:'40px 0' }}>Loading...</p>:
          <>
            {/* Property details  */}
            <PropertyDetailsFormHome formData={formData} setFormData={setFormData}/>    
            
            <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>Slots</HeaderTwo>

            <TopLeftFlexAlignedContainer style={{ justifyContent: 'center', width: '100%' }}>
              {(numberOfSlotsForOfficeSpace !==0 && isLoading === false) ?
                <Grid container spacing={4} sx={{ width: '100%' }}>
                  {slotsForOfficeSpace.map((slot, index) => {
                    if (slot.status !== 'unavailable') {
                      return (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                          <CustomPropertyCard>
                            {slot.pictures[0] && <CardMedia component="div" sx={{ pt: '56.25%',}} image={`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/spaces/${slot.pictures[0]}`} />}
                            <CardContent sx={{ flexGrow: 1 }}>
                              <span style={{ padding: '4px 12px', background: 'rgba(100, 100, 255, 0.5)' }}>{slot.status}</span>
                              <Typography variant="h5" component="h2" style={{ marginTop: '20px' }}>
                                <MdOutlinePriceChange /> <strong>{slot.price}</strong>
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" onClick={() => navigate(`/space/${params.id}/slot/${slot._id}`)}>More details</Button>
                            </CardActions>
                          </CustomPropertyCard>
                        </Grid>
                      )
                    }
                  })}
                </Grid> :
                <p>No available spaces</p>
              }
            </TopLeftFlexAlignedContainer>

            <LocationMap coordinates={formData.mapCoordinates}/>
            
          </>
        }
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
