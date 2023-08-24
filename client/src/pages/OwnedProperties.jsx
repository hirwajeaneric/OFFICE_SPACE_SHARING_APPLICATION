import React, { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { HeaderTwo } from '../components/styled-components/generalComponents'
import OwnedOfficeSpacesTable from '../components/tables/OwnedOfficeSpacesTable'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../components/sections/ComponentToPrint';


export default function OwnedProperties() {
  const { ownedOfficeSpaces } = useSelector(state => state.officeSpace);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current
  });


  return (
    <div>
      <Helmet>
        <title>My office spaces</title>
        <meta name="description" content={`List of all my properties.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', alignItems:'center', width: '100%' }}>
          <HeaderTwo style={{ margin: '0px' }}>My office spaces</HeaderTwo>
          <Button variant='text' color='info' onClick={handlePrint}>Print list</Button>
        </div>
        <OwnedOfficeSpacesTable data={ownedOfficeSpaces} />
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={componentRef}/>
        </div>
      </InnerContainer>
    </div>
  )
}
