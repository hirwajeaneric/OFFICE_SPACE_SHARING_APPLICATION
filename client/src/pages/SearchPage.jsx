import React from 'react'
import { Helmet } from 'react-helmet-async';
import SearchResults from '../components/sections/SearchResults';
import SearchPageBanner from '../components/sections/SearchPageBanner';

export default function SearchPage() {
  return (
    <>
      <Helmet>
        <title>Search Results.</title>
        <meta name="description" content={`Search results for properties.`} /> 
      </Helmet>
      <SearchPageBanner />
      <SearchResults />
    </>
  )
}
