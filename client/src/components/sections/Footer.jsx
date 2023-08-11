import React from 'react'
import { FullWidthContainer, LeftContainer, PageSizedContainer, RightContainer, TwoSidedContainer } from '../styled-components/generalComponents'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <FullWidthContainer style={{ background: 'white', borderTop: '2px solid green' }}>
        <PageSizedContainer style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TwoSidedContainer style={{ margin: '40px 0', padding: '0 10px' }}>
              <LeftContainer style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Useful Links</h3>
                  <Link to={'/'} style={{ color: 'black', textDecoration: 'none', lineHeight: '25px' }}>Home</Link>
                  <Link to={'/aboutus'} style={{ color: 'black', textDecoration: 'none', lineHeight: '25px' }}>About Us</Link>
                  <Link to={'/contactus'} style={{ color: 'black', textDecoration: 'none', lineHeight: '25px' }}>Contact Us</Link>
                  <Link to={'/post'} style={{ color: 'black', textDecoration: 'none', lineHeight: '25px' }}>Post new</Link>
                </div>
              </LeftContainer>
              <RightContainer style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start', width: '100%' }}>
                  <h3 style={{ marginBottom: '20px' }}>Contact Us</h3>
                  <p style={{ lineHeight: '25px'}}>
                    ISMA Ltd<br/>
                    KG 541 ST, House No 10<br/>
                    P.O.Box 3009 Kigali<br/>
                    Tel: +250 780 460 848<br/>
                    Email: info@isma.com
                  </p>
                </div>
              </RightContainer>
            </TwoSidedContainer>
            <p style={{ padding: '40px 10px', borderTop: '1px solid gray', width: '100%' }}>© ISMA Ltd {new Date().getFullYear()}. All Rights Reserved.</p>
        </PageSizedContainer>
    </FullWidthContainer>
  )
}
