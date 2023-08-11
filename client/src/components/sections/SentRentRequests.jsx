import React from 'react'
import RentRequestsTable from '../tables/RentRequestsTable';
import { useSelector } from 'react-redux';

export default function SentRentRequests() {
    const { isLoading, listOfRentRequestsSentByMe } = useSelector(state => state.rentRequest);
    
    if (isLoading) {
        return (<p>Loading...</p>)
    }

    return (
        <div style={{ width: '100%' }}>
            <RentRequestsTable data={listOfRentRequestsSentByMe} />
        </div>
    )
}
