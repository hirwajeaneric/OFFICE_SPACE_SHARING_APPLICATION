import React from 'react'
import { Helmet } from 'react-helmet-async'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { HeaderTwo } from '../components/styled-components/generalComponents'
import ContractsTable from '../components/tables/ContractsTable'
import { useSelector } from 'react-redux';

export default function Contracts() {
  const { isLoading, listOfContracts } = useSelector(state =>state.contract ); 
  
  return (
    <div>
      <Helmet>
        <title>List of contract</title>
        <meta name="description" content={`List of contracts.`} /> 
      </Helmet>
      {
        isLoading ? 
        <p>Loading...</p> : 
        <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
          <HeaderTwo style={{ margin: '0', borderBottom: '1px solid rgb(120,116,116, 0.5)', paddingBottom: '10px', width: '100%' }}>Contracts</HeaderTwo>
          <ContractsTable data={listOfContracts}/>
        </InnerContainer>
      }
    </div>
  )
}
