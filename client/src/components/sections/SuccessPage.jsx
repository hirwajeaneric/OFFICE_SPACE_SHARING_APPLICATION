import React, {useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const SuccessPage = () => {
    const params = useParams();

    useEffect(() => {
        
        var updatedSlot = { 
            occupantId: params.userId, 
            occupantName: JSON.parse(localStorage.getItem('usrInfo')).fullName, 
            occupiedOn: new Date().toDateString(),
            status: 'occupied'
        }

        axios.put(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/slot/update?id=${params.slotId}`, updatedSlot)
        .then(response => {
            if (response.status === 200) {
                console.log(response.data.message)
            }
        })
        .catch(error => console.error(error))
    },[params.fullName, params.slotId, params.userId])

    return (
        <div style={{ display: 'flex', flexDirection:'column', gap: '20px', marginTop: '20px', alignItems:'flex-start', width: '100%', background: 'white', border: '1px solid #d1e0e0', padding: '20px', borderRadius: '5px' }}>
            <h1 style={{ fontSize: '400%', color: 'green' }}>Success</h1>
            <p>Slot successfuly booked.</p>
            <Link to='../rented-slots' style={{ textDecoration: 'none', color: 'blue' }}>View your rented slots</Link>
        </div>
    )
}

export default SuccessPage