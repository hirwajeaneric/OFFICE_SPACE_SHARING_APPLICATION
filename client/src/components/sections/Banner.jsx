import React from 'react'
import { FullWidthContainer, HeaderOne, HeaderTwo, PageSizedContainer } from '../styled-components/generalComponents'
import SearchForm from '../forms/SearchForm';
import { useSelector } from 'react-redux';

export default function Banner() {
  const { isLoading, numberOfOfficeSpaces } = useSelector(state => state.officeSpace); 
  const { numberOfAllAvailableSlots } = useSelector(state => state.slot); 

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
            <HeaderOne style={{color: 'white' }}>Find an office space or a slot of your convenience.</HeaderOne>
            <SearchForm />
            {isLoading ? 
              <p style={{color: 'white',}}>Loading...</p> :
              <HeaderTwo style={{color: 'white',}}>{numberOfOfficeSpaces} office spaces and {numberOfAllAvailableSlots} slots to choose from.</HeaderTwo>
            }
          </div>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
