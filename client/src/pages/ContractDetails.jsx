import React, { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { HeaderTwo } from '../components/styled-components/generalComponents'
import ContractDetailsForm from '../components/forms/ContractDetailsForm'
import { Button } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../components/sections/ComponentToPrint';

export default function ContractDetails() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current
  });

  return (
    <div>
      <Helmet>
        <title>Contract details</title>
        <meta name="description" content={`Contract details.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', width: '100%', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px' }}>
          <HeaderTwo style={{ margin: '0' }}>Contract Details</HeaderTwo>
          <Button variant='contained' size='small' color='secondary' onClick={handlePrint}>Print</Button>
        </div>

        <ContractDetailsForm />
        <ComponentToPrint ref={componentRef} />

      </InnerContainer>
    </div>
  )
}
