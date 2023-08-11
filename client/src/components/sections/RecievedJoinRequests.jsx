import React from 'react'
import JoinRequestsTable from '../tables/JoinRequestsTable';
import { useSelector } from 'react-redux';

export default function RecievedRentRequests() {
    const { isLoading, listOfJoinRequestsSentToMe } = useSelector(state => state.joinRequest);
    
    if (isLoading) {
        return (<p>Loading...</p>)
    }

    return (
        <div style={{ width: '100%' }}>
            <JoinRequestsTable data={listOfJoinRequestsSentToMe} />
        </div>
    )
}
