import React, { useEffect, useState } from 'react'
import { Bed, Chair, LocationCity, StarOutlineSharp } from '@mui/icons-material';
import { FaRulerCombined, FaShower } from 'react-icons/fa';
import { PropertyDetailsStyles } from '../styled-components/generalComponents';

export default function PropertyMajorDetails({descriptions}) {
    const [details, setDetails] = useState({
        price: 0,
        dimensions: 0,
    });

    useEffect(() => {
        setDetails({
            price: descriptions.price,
            dimensions: descriptions.dimensions, 
        })
    },[descriptions])

    return (
        <PropertyDetailsStyles style={{ fontSize: '90%' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FaRulerCombined style={{ color: '#1f3d7a' }}/>
                <p style={{ fontSize: '110%', margin: '10px 0', color: '#0a1429' }}>{details.dimensions} m2</p>
                <p style={{ color: '#1f3d7a' }}>Dimensions</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <StarOutlineSharp style={{ color: '#1f3d7a' }}/>
                <p style={{ fontSize: '110%', margin: '10px 0', color: '#0a1429' }}>{details.status}</p>
                <p style={{ color: '#1f3d7a' }}>Status</p>
            </div>
        </PropertyDetailsStyles>
    )
}
