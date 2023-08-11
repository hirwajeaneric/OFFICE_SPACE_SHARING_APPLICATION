import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutUsSection from '../components/sections/AboutUsSection';
import CustomizedBanner from '../components/sections/CustomizedBanner';

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About OSSA.</title>
        <meta name="description" content={`More information about OSSA.`} /> 
      </Helmet>
      <CustomizedBanner title={'About OSSA.'} height={'20vh'}/>
      <AboutUsSection />
    </>
  )
}
