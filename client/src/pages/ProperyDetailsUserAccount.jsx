import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom';
import { InnerContainer } from '../components/styled-components/authenticationPages';
import { CustomLeftContainer, HeaderTwo, TwoSidedContainer } from '../components/styled-components/generalComponents';
import PropertyDetailsForm from '../components/forms/PropertyDetailsForm';
import axios from 'axios';

export default function ProperyDetailsUserAccount() {
  const params = useParams();

  const [formData, setFormData] = useState({ officeSpaceType: '', rentPrice: '', location: '', mapCoordinates: '', dimensions: '', description: '', bedRooms: '', bathRooms: '', furnished: false });
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('usrInfo')));

    axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/officeSpace/findById/id=${params.officeSpaceId}`)
    .then(response => {
      setFormData(response.data.officeSpace);
    })
    .catch(error => console.log(error));
  },[params.officeSpaceId]);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },1500);
  },[])

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
            <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Office space Details</HeaderTwo>
            <PropertyDetailsForm 
              formData={formData} 
              setFormData={setFormData} 
              userData={userData}
            />
          </CustomLeftContainer>
        </TwoSidedContainer>
        }
      </InnerContainer>
    </div>
  )
}
