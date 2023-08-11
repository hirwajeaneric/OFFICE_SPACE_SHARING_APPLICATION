import React from 'react'
import { Helmet } from 'react-helmet-async'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { HeaderTwo } from '../components/styled-components/generalComponents'
import OwnedHousesTable from '../components/tables/OwnedPropertiesTable'
import { useSelector } from 'react-redux'

export default function OwnedProperties() {
  const {ownedProperties} = useSelector(state => state.property);

  return (
    <div>
      <Helmet>
        <title>My properties</title>
        <meta name="description" content={`List of all my properties.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Owned Properties</HeaderTwo>
        <OwnedHousesTable data={ownedProperties} />
      </InnerContainer>
    </div>
  )
}
