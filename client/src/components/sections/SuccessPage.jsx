import React, {useEffect} from 'react';
import { TwoSidedContainer } from '../styled-components/generalComponents';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        <TwoSidedContainer style={{ flexDirection:'row', marginTop: '20px', alignItems:'flex-start', width: '100%', background: 'white', border: '1px solid #d1e0e0', padding: '20px', borderRadius: '5px' }}>
            Success
        </TwoSidedContainer>
    )
}

export default SuccessPage