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
                OSSA is an acronym of the word: "Office Space Sharing Application".
                <br /><br /> 
                It was inspired and founded by <strong>Sandra MUTONI</strong> after realizing that there was a rising crisis of the lack of affordable office spaces in new businesses and start ups.
                She also realized that there is also a communication gap between office space and commercial building owners and business people or those who need work spaces.
                That need for a connection of these 2 parties was the one that influenced the creation of OSSA.
              </p>
            </LeftContainer>
            <RightContainer style={{ flexDirection: 'column', padding: '10px'}}>
              <HeaderOne style={{color: 'black', textAlign: 'left', width: '100%', margin: '0 0 40px'}}>Features and How To Use OSSA</HeaderOne>
              <p style={{ margin: '20px 0' }}>
                <HeaderTwo>Here is what OSSA can will help you with</HeaderTwo>
                <br/>
                <ul style={{ padding: '10px 20px 0' }}>
                  <li>This application helps the owner of an office space or agent in charge to upload the office space.</li>
                  <br/>
                  <li>It also allows people who need slots in the available spaces to rent the specific slots they need.</li>
                </ul>
              </p>
            </RightContainer>
          </TwoSidedContainer>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
