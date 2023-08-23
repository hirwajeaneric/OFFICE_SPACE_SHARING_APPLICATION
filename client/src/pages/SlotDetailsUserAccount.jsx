import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom';
import { InnerContainer } from '../components/styled-components/authenticationPages';
import { CustomLeftContainer, HeaderTwo, TwoSidedContainer } from '../components/styled-components/generalComponents';
import PropertyDetailsForm from '../components/forms/SlotDetailsForm';
import axios from 'axios';
import SlotDetailsForm from '../components/forms/SlotDetailsForm';

export default function SlotDetailsUserAccount() {
  const params = useParams();

  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('usrInfo')));

    axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/slot/findById?id=${params.slotId}`)
    .then(response => {
      setFormData(response.data.slot);
    })
    .catch(error => console.log(error));
  },[params.slotId]);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },1000);
  },[])

  return (
    <div>
      <Helmet>
        <title>Slot Details</title>
        <meta name="description" content={`Details for slot.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        {isLoading && <p>Loading...</p>}
        {!isLoading && 
        <TwoSidedContainer style={{ alignItems: 'flex-start'}}>
          <CustomLeftContainer style={{ justifyContent:'flex-start', flexDirection: 'column', gap: '20px', marginBottom: '40px', width: '100%' }}>
            <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Slot Details</HeaderTwo>
            <SlotDetailsForm 
              formData={formData} 
              setFormData={setFormData} 
            />
          </CustomLeftContainer>
        </TwoSidedContainer>
        }
      </InnerContainer>
    </div>
  )
}
