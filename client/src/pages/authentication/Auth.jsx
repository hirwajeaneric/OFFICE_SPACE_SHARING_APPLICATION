import React from 'react'
import { Outlet } from 'react-router-dom'
import { FullWidthContainer, LeftContainer, PageSizedContainer, RightContainer, TwoSidedContainer } from '../../components/styled-components/generalComponents'

export default function Auth() {
  return (
    <FullWidthContainer 
        style={{ 
            background:'url("/imgs/bannerImage.jpg"), rgba(0,0,0,0.5)',
            backgroundSize:'cover',
            backgroundBlendMode: 'darken',
            backgroundRepeat: 'no-repeat',
        }}>
        <PageSizedContainer>
            <TwoSidedContainer>
                <LeftContainer>
                    {/* <div>Authentication page</div> */}
                </LeftContainer>
                <RightContainer>
                    <Outlet />
                </RightContainer>
            </TwoSidedContainer>
        </PageSizedContainer>
    </FullWidthContainer>
  )
}
