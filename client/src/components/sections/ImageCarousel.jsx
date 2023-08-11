import React from 'react';
import { CustomCarousel, CustomPaper } from '../styled-components/generalComponents';
import { APIS } from '../../utils/APIS';

export default function ImageCarousel(props) {
  const { pictures } = props; 
  return (
    <CustomCarousel>
      { pictures && pictures.map((image, index) => 
        <CustomPaper key={index}>
          <img src={`${APIS.files.property}${image}`} alt={image} />
        </CustomPaper>
      )}
    </CustomCarousel>
  )
}
