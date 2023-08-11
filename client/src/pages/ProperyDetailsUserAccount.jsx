import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom';
import { InnerContainer } from '../components/styled-components/authenticationPages';
import { CustomLeftContainer, CustomRightContainer, HeaderTwo, TwoSidedContainer } from '../components/styled-components/generalComponents';
import PropertyDetailsForm from '../components/forms/PropertyDetailsForm';
import axios from 'axios';
import { APIS } from '../utils/APIS';
import PublishPropertyForm from '../components/forms/PublishPropertyForm';

export default function ProperyDetailsUserAccount() {
  const params = useParams();

  const [formData, setFormData] = useState({ propertyType: '', rentPrice: '', location: '', mapCoordinates: '', dimensions: '', description: '', bedRooms: '', bathRooms: '', furnished: false });
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('usrInfo')));

    axios.get(APIS.propertyApis.findById+params.propertyId)
    .then(response => {
      setFormData(response.data.property);
    })
    .catch(error => console.log(error));
  },[params.propertyId]);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },1500);
  },[])

  return (
    <div>
      <Helmet>
        <title>Property details</title>
        <meta name="description" content={`Details for property number: ${params.propertyId}.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        {isLoading && <p>Loading...</p>}
        {!isLoading && 
        <TwoSidedContainer style={{ alignItems: 'flex-start'}}>
          {formData.ownerId === userData.id ?
          <>
            <CustomLeftContainer style={{ justifyContent:'flex-start', flexDirection: 'column', gap: '20px', marginBottom: '40px', width: '100%' }}>
              <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Property Details</HeaderTwo>
              <PropertyDetailsForm 
                formData={formData} 
                setFormData={setFormData} 
                userData={userData}
              />
            </CustomLeftContainer>
          </>
          :
          <>
            <CustomLeftContainer style={{ justifyContent:'flex-start', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Property Details</HeaderTwo>
              <PropertyDetailsForm 
                formData={formData} 
                setFormData={setFormData} 
                userData={userData}
              />
            </CustomLeftContainer>
            {userData.id === formData.tenants[0].id && 
              <CustomRightContainer style={{ justifyContent:'flex-start', flexDirection: 'column' }}>
                <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Post Apartment</HeaderTwo>
                <PublishPropertyForm property={formData} />
              </CustomRightContainer>
            }
          </>
          }
        </TwoSidedContainer>
        }
      </InnerContainer>
    </div>
  )
}
