import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomizedBanner from '../components/sections/CustomizedBanner';
import ContactForm from '../components/forms/ContactForm';
import { FullWidthContainer, PageSizedContainer } from '../components/styled-components/generalComponents';

export default function ContactUs() {
  return (
    <FullWidthContainer style={{ flexDirection: 'column',}}>
      <Helmet>
        <title>Contact Us.</title>
        <meta name="description" content={`More information about ISMA.`} /> 
      </Helmet>
      <CustomizedBanner title={'Contact Us.'} subtitle={'Do you have a question, do you need support with how to use ISMA? Do not hesitate to leave us a message.'} height={'20vh'}/>
      <PageSizedContainer style={{ flexDirection: 'column', margin: '40px 0 40px', padding: '10px'}}>
        <ContactForm />
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
