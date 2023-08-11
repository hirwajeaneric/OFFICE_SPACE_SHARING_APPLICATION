import React from 'react'
import { FullWidthContainer, HeaderTwo, PageSizedContainer } from '../styled-components/generalComponents'
import SearchForm from '../forms/SearchForm';

export default function SearchPageBanner() {
  return (
    <FullWidthContainer style={{ background:'#d9e6f2' }}>
      <PageSizedContainer style={{ height: '100%', flexDirection: 'column', marginTop: '40px', padding: '10px' }}>
        <HeaderTwo style={{color: 'black', width: '100%', textAlign:'left'}}>Search Results. </HeaderTwo>
        <div style={{ width: '100%'}}>
          <SearchForm />
        </div>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
