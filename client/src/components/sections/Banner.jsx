import React from 'react'
import { FullWidthContainer, HeaderOne, HeaderTwo, PageSizedContainer } from '../styled-components/generalComponents'
import SearchForm from '../forms/SearchForm';
import { useSelector } from 'react-redux';

export default function Banner() {
  const { isLoading, numberOfPropertiesForRent, numberOfPropertiesForJoin } = useSelector(state => state.property); 

  return (
    <FullWidthContainer 
      style={{ 
          background:'url("/imgs/bannerImage.jpg"), rgba(0,0,0,0.5)',
          backgroundSize:'cover',
          backgroundBlendMode: 'darken',
          backgroundRepeat: 'no-repeat',
      }}>
      <PageSizedContainer style={{ height: '100vh' }}>
          <div style={{ width: '80%'}}>
            <HeaderOne style={{color: 'white' }}>Find your best stay with few searches.</HeaderOne>
            <SearchForm />
            {isLoading ? 
              <p style={{color: 'white',}}>Loading...</p> :
              <HeaderTwo style={{color: 'white',}}>{numberOfPropertiesForRent} free apartment{numberOfPropertiesForRent.length > 1 && 's'} and {numberOfPropertiesForJoin} to join.</HeaderTwo>
            }
          </div>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
