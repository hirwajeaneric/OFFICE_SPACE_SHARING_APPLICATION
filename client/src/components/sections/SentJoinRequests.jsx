import React from 'react'
import JoinRequestsTable from '../tables/JoinRequestsTable';
import { useSelector } from 'react-redux';

export default function SentRentRequests() {
    const { isLoading, listOfJoinRequestsSentByMe } = useSelector(state => state.joinRequest);
    
    if (isLoading) {
        return (<p>Loading...</p>)
    }

    return (
        <div style={{ width: '100%' }}>
            <JoinRequestsTable data={listOfJoinRequestsSentByMe} />
        </div>
    )
}
