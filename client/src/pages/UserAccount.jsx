import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FullWidthContainer, HeaderThree, PageSizedContainer, PageWithSideMenuContainer, SideMenu } from '../components/styled-components/generalComponents';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnedProperties, getProperties } from '../redux/features/propertySlice';
import { getRentRequests } from '../redux/features/rentRequestsSlice';
import { getJoinRequests } from '../redux/features/joinRequestsSlice';
import { getContracts } from '../redux/features/contractSlice';

export default function UserAccount() {
  const dispatch = useDispatch();

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem('usrInfo'));
    dispatch(getProperties(userInfo.id));
    dispatch(getOwnedProperties(userInfo.id));
    dispatch(getRentRequests(userInfo.id));
    dispatch(getJoinRequests(userInfo.id));
    dispatch(getContracts(userInfo.id));
  }, [dispatch]);

  const { isLoading, numberOfRentedProperties, numberOfOwnedProperties } = useSelector(state => state.property);
  const { numberOfRentRequestsSentByMe, numberOfRentRequestsSentToMe } = useSelector(state => state.rentRequest);
  const { numberOfJoinRequestsSentByMe, numberOfJoinRequestsSentToMe } = useSelector(state => state.joinRequest);
  const { numberOfContracts } = useSelector(state => state.contract);

  return (
    <FullWidthContainer>
      <PageSizedContainer>
        <PageWithSideMenuContainer style={{ margin: '40px 0', padding: '10px' }}>
          {isLoading ? 
          <p>Loading...</p> :
          <>
            <div className='leftSide'>
              <SideMenu>
                <HeaderThree>Properties</HeaderThree>
                <NavLink to={'overview'}>
                  <span>Overview</span> 
                </NavLink>
                <NavLink to={'owned-properties'}>
                  <span>Owned</span> 
                  <span className='quantity'>{numberOfOwnedProperties}</span>
                </NavLink>
                <NavLink to={'rented-properties'}>
                  <span>Rented</span> 
                  <span className='quantity'>{numberOfRentedProperties}</span>
                </NavLink>
                
                <HeaderThree className='menu-header'>Requests</HeaderThree>
                
                <NavLink to={'rent-requests/all/sent'}>
                  <span>Rent Requests</span> 
                  <span className='quantity'>{numberOfRentRequestsSentByMe+numberOfRentRequestsSentToMe}</span>
                </NavLink>
                <NavLink to={'join-requests/all/sent'}>
                  <span>Join Requests</span> 
                  <span className='quantity'>{numberOfJoinRequestsSentByMe+numberOfJoinRequestsSentToMe}</span>
                </NavLink>
                <HeaderThree className='menu-header'>Reports</HeaderThree>
                <NavLink to={'contracts'}>
                  <span>Contracts</span> 
                  <span className='quantity'>{numberOfContracts}</span>
                </NavLink>

                <HeaderThree className='menu-header'>Settings</HeaderThree>
                
                <NavLink to={'settings'}>
                  <span>My Account</span> 
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
