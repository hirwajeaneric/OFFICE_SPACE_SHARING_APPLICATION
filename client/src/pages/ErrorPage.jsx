import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FullWidthContainer, PageSizedContainer } from '../components/styled-components/generalComponents';

export default function ErrorPage() {
  return (
    <FullWidthContainer>
      <Helmet>
        <title>Page not found.</title>
        <meta name="description" content={`Page not found`} /> 
      </Helmet>
      <PageSizedContainer style={{ flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ margin: '40px 0' }}>
          <p style={{ fontSize: '500%', textAlign: 'center', marginBottom: '20px' }}>👾</p>
          <h1 style={{ color: 'red', textAlign: 'center' }}>404</h1>
          <h2>Page not found</h2>
        </div>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
