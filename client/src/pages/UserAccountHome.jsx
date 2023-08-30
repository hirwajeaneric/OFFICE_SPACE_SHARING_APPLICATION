import React from 'react'
import { Helmet } from 'react-helmet-async'
import { StatsCard, ThreeSidedContainer } from '../components/styled-components/generalComponents'
import { InnerContainer } from '../components/styled-components/authenticationPages'
import { Link } from 'react-router-dom'
import { ArrowForward } from '@mui/icons-material';
import { useSelector } from 'react-redux'

export default function UserAccountHome() {
  const { isLoading, numberOfOwnedOfficeSpaces } = useSelector(state => state.officeSpace);
  const { numberOfRentedSlots } = useSelector(state => state.slot);
  const { numberOfRentRequestsSentByMe, numberOfRentRequestsSentToMe } = useSelector(state => state.rentRequest);
  
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
              {numberOfOwnedOfficeSpaces !==0 && 
                <StatsCard style={{ background: numberOfOwnedOfficeSpaces !==0 && '#004466', color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>
                  <div>
                    <h4>Owned Office Spaces</h4>
                    { numberOfOwnedOfficeSpaces !==0 ?
                      <Link to={'../owned-spaces'} style={{ color: numberOfOwnedOfficeSpaces!==0 && '#b3e6ff' }}><span>View List</span> <ArrowForward /></Link> :
                      <Link to={'/upload'}><span>Upload office</span> <ArrowForward /></Link>
                    }
                  </div>
                  <p>{numberOfOwnedOfficeSpaces}</p>
                </StatsCard>
              }
              <StatsCard style={{ background: numberOfOwnedOfficeSpaces !==0 && '#004466', color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>
                <div>
                  <h4>Rented Slots</h4>
                  { numberOfRentedSlots !== 0 ?
                    <Link to={'../rented-slots'}><span>View all</span> <ArrowForward /></Link> :
                    <Link to={'/'}><span>View spaces</span> <ArrowForward /></Link>
                  }
                </div>
                <p>{numberOfRentedSlots}</p>
              </StatsCard>
              <StatsCard style={{ background: numberOfOwnedOfficeSpaces !==0 && '#004466', color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>
                <div>
                  <h4>Rent Requests Sent</h4>
                  <Link to={'../rent-requests/all/sent'}><span>View Requests</span> <ArrowForward /></Link>
                </div>
                <p>{numberOfRentRequestsSentByMe}</p>
              </StatsCard>
              <StatsCard style={{ background: numberOfOwnedOfficeSpaces !==0 && '#004466', color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>
                <div>
                  <h4>Rent Requests Recieved</h4>
                  <Link to={'../rent-requests/all/recieved'} style={{ color: numberOfOwnedOfficeSpaces !==0 && '#b3e6ff' }}><span>View Requests</span> <ArrowForward /></Link>
                </div>
                <p>{numberOfRentRequestsSentToMe}</p>
              </StatsCard>
            </>
          }
        </ThreeSidedContainer>
      </InnerContainer>
    </div>
  )
}
