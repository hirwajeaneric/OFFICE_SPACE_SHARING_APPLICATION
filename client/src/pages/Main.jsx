import React from 'react'
import NavigationBar from '../components/sections/NavigationBar';
import Footer from '../components/sections/Footer';
import { Outlet } from 'react-router-dom';
import { FullWidthContainer, MainAppContainer } from '../components/styled-components/generalComponents';

export default function Main() {
  return (
    <MainAppContainer>
      <FullWidthContainer style={{ width: '100%', flexDirection: 'column', position:'relative' }}>
        <NavigationBar/>
        <Outlet />
      </FullWidthContainer>
      {/* Footer  */}
      <Footer />
    </MainAppContainer>
  )
}
