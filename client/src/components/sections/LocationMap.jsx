import React, { useEffect, useState } from 'react'
import { MapContainer } from '../styled-components/generalComponents'

export default function LocationMap({coordinates}) {
  const [coords, setCoords] = useState('');
  useEffect(()=>{
    setCoords(coordinates);
  },[coordinates]);

  return (
    <MapContainer>
        <iframe
            frameborder="0"
            referrerpolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD4FmjUaCgW3-DbXE3ZleDnCC-5lv9FOVU&q=${coords}`}
            allowfullscreen>
        </iframe>
    </MapContainer>
  )
}
