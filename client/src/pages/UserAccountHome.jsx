import React from 'react'
import { Helmet } from 'react-helmet-async'
import { StatsCard, ThreeSidedContainer } from '../components/styled-components/generalComponents'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { Link } from 'react-router-dom'
import { ArrowForward } from '@mui/icons-material';
import { useSelector } from 'react-redux'

export default function UserAccountHome() {
  const { isLoading, numberOfRentedProperties, numberOfOwnedProperties, numberOfTenants } = useSelector(state => state.property);
  const { numberOfRentRequestsSentByMe, numberOfRentRequestsSentToMe } = useSelector(state => state.rentRequest);
  const { numberOfJoinRequestsSentByMe, numberOfJoinRequestsSentToMe } = useSelector(state => state.joinRequest);
  const { numberOfContracts } = useSelector(state => state.contract);
  
  return (
    <div>
      <Helmet>
        <title>My account</title>
        <meta name="description" content={`My account dashboard home.`} /> 
      </Helmet>
      <InnerContainer style={{ width: '100%', alignItems:'flex-start', margin: '0', background: 'none', borderTop: 'none' }}>
        <ThreeSidedContainer>
          {
            isLoading ? 
            <p>Loading...</p> :
            <>
              <StatsCard>
                <div>
                  <h4>Owned Properties</h4>
                  { numberOfOwnedProperties !==0 ?
                    <Link to={'../owned-properties'}><span>View List</span> <ArrowForward /></Link> :
                    <Link to={'/post'}><span>Post now</span> <ArrowForward /></Link>
                  }
                </div>
                <p>{numberOfOwnedProperties}</p>
              </StatsCard>
              <StatsCard>
                <div>
                  <h4>Rented Apartments</h4>
                  { numberOfRentedProperties !== 0 ?
                    <Link to={'../rented-properties'}><span>View List</span> <ArrowForward /></Link> :
                    <Link to={'/'}><span>View Apartments</span> <ArrowForward /></Link>
                  }
                </div>
                <p>{numberOfRentedProperties}</p>
              </StatsCard>
              <StatsCard>
                <div>
                  <h4>Rent Requests Sent</h4>
                  <Link to={'../rent-requests/all/sent'}><span>View Requests</span> <ArrowForward /></Link>
                </div>
                <p>{numberOfRentRequestsSentByMe}</p>
              </StatsCard>
              <StatsCard>
                <div>
                  <h4>Rent Requests Recieved</h4>
                  <Link to={'../rent-requests/all/recieved'}><span>View Requests</span> <ArrowForward /></Link>
                </div>
                <p>{numberOfRentRequestsSentToMe}</p>
              </StatsCard>
              <StatsCard>
                <div>
                  <h4>Join Requests Sent</h4>
                  <Link to={'../join-requests/all/sent'}><span>View Requests</span> <ArrowForward /></Link>
                </div>
                <p>{numberOfJoinRequestsSentByMe}</p>
              </StatsCard>
              <StatsCard>
                <div>
                  <h4>Join Requests Recieved</h4>
                  <Link to={'../join-requests/all/recieved'}><span>View Requests</span> <ArrowForward /></Link>
                </div>
                <p>{numberOfJoinRequestsSentToMe}</p>
              </StatsCard>
              <StatsCard>
                <div>
                  <h4>Contracts</h4>
                  <Link to={'../contracts'}><span>My Contracts</span> <ArrowForward /></Link>
                </div>
                <p>{numberOfContracts}</p>
              </StatsCard>
            </>
          }
        </ThreeSidedContainer>
      </InnerContainer>
    </div>
  )
}
