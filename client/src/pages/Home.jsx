import React from 'react'
import { Helmet } from 'react-helmet-async'
import Banner from '../components/sections/Banner'
import RecentlyPosted from '../components/sections/RecentlyPosted'
import ToBeJoined from '../components/sections/ToBeJoined'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Welcome to OSSA - The best office space sharing application for all business sizes.</title>
        <meta name="description" content={`The best office space sharing application for all business sizes.`} /> 
      </Helmet>
      
      <Banner />
      <RecentlyPosted />
      <ToBeJoined />
    </>
  )
}
