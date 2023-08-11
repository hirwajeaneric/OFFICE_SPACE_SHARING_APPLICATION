import React from 'react';
import { CustomCarousel, CustomPaper } from '../styled-components/generalComponents';

export default function ImageCarousel(props) {
  const { pictures } = props; 
  return (
    <CustomCarousel>
      { pictures && pictures.map((image, index) => 
        <CustomPaper key={index}>
          <img src={`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/spaces/${image}`} alt={image} />
        </CustomPaper>
      )}
    </CustomCarousel>
  )
}
