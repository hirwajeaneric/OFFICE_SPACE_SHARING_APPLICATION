import React from 'react'
import { Helmet } from 'react-helmet-async'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { HeaderTwo } from '../components/styled-components/generalComponents'
import RentedSlotsTable from '../components/tables/RentedSlotsTable'
import { useSelector } from 'react-redux'

export default function RentedProperties() {
  const { rentedSlots } = useSelector(state => state.slot);

  return (
    <div>
      <Helmet>
        <title>Rented slots</title>
        <meta name="description" content={`Rented properties.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Rented slots</HeaderTwo>
        <RentedSlotsTable data={rentedSlots}/>
      </InnerContainer>
    </div>
  )
}
