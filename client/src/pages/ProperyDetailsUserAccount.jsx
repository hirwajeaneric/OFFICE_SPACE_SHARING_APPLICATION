import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom';
import { InnerContainer } from '../components/styled-components/authenticationPages';
import { CustomLeftContainer, SlotsContainer, TwoSidedContainer } from '../components/styled-components/generalComponents';
import PropertyDetailsForm from '../components/forms/PropertyDetailsForm';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSlotsForOfficeSpace } from '../redux/features/slotSlice';
import SlotsTable from '../components/tables/SlotsTable';
import AddSlot from '../components/forms/AddSlot';

export default function ProperyDetailsUserAccount() {
  const params = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ officeSpaceType: '', rentPrice: '', location: '', mapCoordinates: '', dimensions: '', description: '', bedRooms: '', bathRooms: '', furnished: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/officeSpace/findById?id=${params.id}`)
    .then(response => {
      setFormData(response.data.officeSpace);
      dispatch(getSlotsForOfficeSpace({ spaceId: params.id }))
    })
    .catch(error => console.log(error));
  },[dispatch, params.id]);

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false);
    },1500);
  }

  const { slotsForOfficeSpace } = useSelector(state => state.slot);

  return (
    <div>
      <Helmet>
        <title>Space details</title>
        <meta name="description" content={`Details for officeSpace number: ${params.officeSpaceId}.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        {isLoading && <p>Loading...</p>}
        {!isLoading && 
        <TwoSidedContainer style={{ alignItems: 'flex-start'}}>
          <CustomLeftContainer style={{ justifyContent:'flex-start', flexDirection: 'column', gap: '20px', marginBottom: '40px', width: '100%' }}>
            
            <PropertyDetailsForm formData={formData} setFormData={setFormData}/>
            
            <SlotsContainer>
              <h3>Add new slot</h3>
              <AddSlot />
              <h3>{slotsForOfficeSpace.length} Slots</h3>
              <SlotsTable data={slotsForOfficeSpace} />
            </SlotsContainer>
          
          </CustomLeftContainer>
        </TwoSidedContainer>
        }
      </InnerContainer>
    </div>
  )
}
