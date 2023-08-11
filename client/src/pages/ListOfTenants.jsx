import React from 'react'
import { Helmet } from 'react-helmet-async'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { HeaderTwo } from '../components/styled-components/generalComponents'
import TenantsTable from '../components/tables/TenantsTable'

export default function ListOfTenants() {
  return (
    <div>
      <Helmet>
        <title>List of tenants</title>
        <meta name="description" content={`List of all people who are renting my properties.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>My Tenants</HeaderTwo>
        <TenantsTable />
      </InnerContainer>
    </div>
  )
}
