import React from 'react'
import RentRequestsTable from '../tables/RentRequestsTable';
import { useSelector } from 'react-redux';

export default function RecievedRentRequests() {
    const { isLoading, listOfRentRequestsSentToMe } = useSelector(state => state.rentRequest);
    
    if (isLoading) {
        return (<p>Loading...</p>)
    }

    return (
        <div style={{ width: '100%' }}>
            <RentRequestsTable data={listOfRentRequestsSentToMe} />
        </div>
    )
}
