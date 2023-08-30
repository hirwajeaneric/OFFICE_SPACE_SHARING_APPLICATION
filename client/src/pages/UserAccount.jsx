import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FullWidthContainer, HeaderThree, PageSizedContainer, PageWithSideMenuContainer, SideMenu } from '../components/styled-components/generalComponents';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnedOfficeSpaces, getOfficeSpaces } from '../redux/features/officeSpaceSlice';
import { getRentRequests } from '../redux/features/rentRequestsSlice';
import { getMyRentedSlots } from '../redux/features/slotSlice';

export default function UserAccount() {
  const dispatch = useDispatch();

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem('usrInfo'));
    dispatch(getOfficeSpaces());
    dispatch(getOwnedOfficeSpaces({ ownerId: userInfo.id }));
    dispatch(getRentRequests(userInfo.id));
    dispatch(getMyRentedSlots({ occupantId: userInfo.id}));
  }, [dispatch]);

  const { isLoading, numberOfOwnedOfficeSpaces } = useSelector(state => state.officeSpace);
  const { numberOfRentedSlots } = useSelector(state => state.slot);
  const { numberOfRentRequestsSentByMe, numberOfRentRequestsSentToMe } = useSelector(state => state.rentRequest);

  return (
    <FullWidthContainer>
      <PageSizedContainer>
        <PageWithSideMenuContainer style={{ margin: '40px 0', padding: '10px' }}>
          {isLoading ? 
            <p>Loading...</p> :
          <>
            <div className='leftSide'>
              <SideMenu style={{ background: numberOfOwnedOfficeSpaces !==0 && '#004466', color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>
                <HeaderThree>Office spaces</HeaderThree>
                <NavLink to={'overview'} style={{ color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>
                  <span>Overview</span> 
                </NavLink>
                {numberOfOwnedOfficeSpaces !==0 && 
                  <NavLink to={'owned-spaces'}>
                    <span style={{ color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>Owned spaces</span> 
                    <span className='quantity'>{numberOfOwnedOfficeSpaces}</span>
                  </NavLink>
                }
                <NavLink to={'rented-slots'}>
                  <span style={{ color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>Rented slots</span> 
                  <span className='quantity'>{numberOfRentedSlots}</span>
                </NavLink>
                
                <HeaderThree className='menu-header'>Requests</HeaderThree>
                
                <NavLink to={'rent-requests/all/sent'}>
                  <span style={{ color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>Rent Requests</span> 
                  <span className='quantity'>{numberOfRentRequestsSentByMe+numberOfRentRequestsSentToMe}</span>
                </NavLink>

                <HeaderThree className='menu-header'>Settings</HeaderThree>
                
                <NavLink to={'settings'}>
                  <span style={{ color: numberOfOwnedOfficeSpaces !==0 && 'white' }}>My Account</span> 
                </NavLink>
              </SideMenu>
            </div>
            <div className='rightSide'>
              <Outlet />
            </div>
          </>}
        </PageWithSideMenuContainer>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
