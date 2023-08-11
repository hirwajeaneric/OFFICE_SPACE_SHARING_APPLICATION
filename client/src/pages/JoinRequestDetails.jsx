import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { InnerContainer } from '../components/styled-components/authenticationPages';
import { HeaderTwo } from '../components/styled-components/generalComponents';
import JoinRequestDetailsForm from '../components/forms/JoinRequestDetailsForm';

export default function JoinRequestDetails() {
  const params = useParams();
  return (
    <div>
      <Helmet>
        <title>Join Request details</title>
        <meta name="description" content={`Details of a join request number: ${params.joinRequestId}.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Join Request Details</HeaderTwo>
        <JoinRequestDetailsForm />
      </InnerContainer>
    </div>
  )
}
