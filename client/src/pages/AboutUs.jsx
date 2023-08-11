import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutUsSection from '../components/sections/AboutUsSection';
import CustomizedBanner from '../components/sections/CustomizedBanner';

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About ISMA.</title>
        <meta name="description" content={`More information about ISMA.`} /> 
      </Helmet>
      <CustomizedBanner title={'About ISMA.'} height={'20vh'}/>
      <AboutUsSection />
    </>
  )
}
