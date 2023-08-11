import React from 'react';
import { FullWidthContainer, HeaderOne, HeaderTwo, LeftContainer, PageSizedContainer, RightContainer, TwoSidedContainer } from '../styled-components/generalComponents';


export default function AboutUsSection() {
  return (
    <FullWidthContainer>
      <PageSizedContainer>
          <TwoSidedContainer style={{ alignItems: 'flex-start', padding: '60px 0'}}>
            <LeftContainer style={{ flexDirection: 'column', marginBottom: '20px', padding: '10px'}}>
              <img src='/imgs/logo2.png' alt='' style={{ width: '100%', border: '1px solid green', margin: '20px 0 40px' }}/>
              <p>
                ISMA is an acronym of the word: "I Share My Apartment".
                <br /><br /> 
                It was inspired by <strong>NKURIKIYINGOMA Honorine</strong> the owner and founder of ISMA 
                after realizing that there was a rising crisis of students from rural areas
                and international students who were finding it very hard to find houses to rent
                nearby university campuses, yet there being apartments and other houses which would
                be rented and shared by many people if they had agreements for that.
              </p>
            </LeftContainer>
            <RightContainer style={{ flexDirection: 'column', padding: '10px'}}>
              <HeaderOne style={{color: 'black', textAlign: 'left', width: '100%', margin: '0 0 40px'}}>Features and How To Use ISMA</HeaderOne>
              <p style={{ margin: '20px 0' }}>
                <HeaderTwo>Here is what ISMA can will help you with</HeaderTwo>
                <br/>
                <ul style={{ padding: '10px 20px 0' }}>
                  <li>This application helps the owner of a house or apartment or agent in charge to upload a house or apartment.</li>
                  <br/>
                  <li>It also allows students and other people who want to rent the houses to join the website and rent the houses.</li>
                  <br/>
                  <li>When applicants are allowed to rent for a house, they are given an opportunity to repost the apartment on the website and find partners and other people who can join them.</li>
                  <br/>
                  <li>People who want to join the apartments would also be able to request for joining the apartments, when allowed, they would visit the apartment, and when all parties agree for the terms of the rent, they sign a contract using the inbuilt system of the application.</li>
                </ul>
              </p>
            </RightContainer>
          </TwoSidedContainer>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
