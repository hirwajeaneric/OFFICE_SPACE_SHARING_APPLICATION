import React from 'react'
import { FullWidthContainer, HeaderOne, HeaderTwo, PageSizedContainer } from '../styled-components/generalComponents'

export default function CustomizedBanner(props) {
  const { title, subtitle, height } = props;
  return (
    <FullWidthContainer 
      style={{ 
          background:'url("/imgs/bannerImage.jpg"), rgba(0,0,0,0.5)',
          backgroundSize:'cover',
          backgroundBlendMode: 'darken',
          backgroundRepeat: 'no-repeat',
          padding: '20px',
      }}>
      <PageSizedContainer style={{ minHeight: height }}>
          <div style={{ width: '100%'}}>
            <HeaderOne style={{color: 'white', textAlign: 'center', margin: '30px 0' }}>{title}</HeaderOne>
            {subtitle && 
              <HeaderTwo style={{color: 'white', textAlign: 'center', width: '100%', margin: '20px 0'}}>{subtitle}</HeaderTwo>
            }
          </div>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
