import React from 'react'
import { Helmet } from 'react-helmet-async'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { HeaderTwo } from '../components/styled-components/generalComponents'
import OwnedOfficeSpacesTable from '../components/tables/OwnedOfficeSpacesTable'
import { useSelector } from 'react-redux'

export default function OwnedProperties() {
  const { ownedOfficeSpaces } = useSelector(state => state.officeSpace);

  return (
    <div>
      <Helmet>
        <title>My office spaces</title>
        <meta name="description" content={`List of all my properties.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>My office spaces</HeaderTwo>
        <OwnedOfficeSpacesTable data={ownedOfficeSpaces} />
      </InnerContainer>
    </div>
  )
}
