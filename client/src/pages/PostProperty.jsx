import React from 'react'
import { Helmet } from 'react-helmet-async'
import { FullWidthContainer, PageSizedContainer } from '../components/styled-components/generalComponents'
import PostPropertyForm from '../components/forms/PostPropertyForm';
import CustomizedBanner from '../components/sections/CustomizedBanner';

export default function PostProperty() {
  return (
    <FullWidthContainer style={{ flexDirection: 'column',}}>
      <Helmet>
        <title>Upload new space</title>
        <meta name="description" content={`Post a new property.`} /> 
      </Helmet>
      <CustomizedBanner title={'Upload new space.'} height={'20vh'} />
      <PageSizedContainer style={{ flexDirection: 'column', margin: '40px 0 40px', padding: '10px'}}>
        <PostPropertyForm />
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
