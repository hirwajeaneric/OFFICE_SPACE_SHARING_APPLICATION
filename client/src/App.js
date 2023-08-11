import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import PropertyDetailsHome from './pages/PropertyDetailsHome';
import UserAccount from './pages/UserAccount';
import Contracts from './pages/Contracts';
import UserAccountHome from './pages/UserAccountHome';
import RentedProperties from './pages/RentedProperties';
import UserAccountSettings from './pages/UserAccountSettings';
import OwnedProperties from './pages/OwnedProperties';
import RentRequestList from './pages/RentRequestList';
import JoinRequestList from './pages/JoinRequestList';
import ListOfTenants from './pages/ListOfTenants';
import PropertyDetailsUserAccount from './pages/ProperyDetailsUserAccount';
import ContractDetails from './pages/ContractDetails';
import RentRequestDetails from './pages/RentRequestDetails';
import JoinRequestDetails from './pages/JoinRequestDetails';
import ReportPreview from './pages/ReportPreview';
import TenantInfo from './pages/TenantInfo';
import ErrorPage from './pages/ErrorPage';
import PostProperty from './pages/PostProperty';
import Signin from './pages/authentication/Signin';
import Signup from './pages/authentication/Signup';
import ResetPassword from './pages/authentication/ResetPassword';
import RequestPasswordReset from './pages/authentication/RequestPasswordReset';
import Auth from './pages/authentication/Auth';
import SearchPage from './pages/SearchPage';
import { useDispatch } from 'react-redux';
import { getProperties } from './redux/features/propertySlice';
import { getRentRequests } from './redux/features/rentRequestsSlice';
import SentRentRequests from './components/sections/SentRentRequests';
import RecievedRentRequests from './components/sections/RecievedRentRequests';
import SentJoinRequests from './components/sections/SentJoinRequests';
import RecievedJoinRequests from './components/sections/RecievedJoinRequests';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { getJoinRequests } from './redux/features/joinRequestsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usrInfo'));
    
    if (user) {
      dispatch(getProperties(user.id));
      dispatch(getRentRequests(user.id));
      dispatch(getJoinRequests(user.id));
    } else {
      dispatch(getProperties());
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Unrestricted Routes  */}
          <Route path='/' element={<Main />}>
            <Route path='*' element={<ErrorPage />} />
            <Route path='' element={<Home />} />
            <Route path='aboutus' element={<AboutUs />} />
            <Route path='contactus' element={<ContactUs />} />
            <Route path='search' element={<SearchPage />} />
            <Route path='property/:id' element={<PropertyDetailsHome />} />
            
            <Route path='' element={<Auth />}>
              <Route path='signin' element={<Signin />} />
              <Route path='signup' element={<Signup />} />
              <Route path='reset-password' element={<ResetPassword />} />
              <Route path='forgot-password' element={<RequestPasswordReset />} />
            </Route>

            {/* Unrestricted Routes  */}
            <Route path='post' element={localStorage.getItem(`usrTkn`) ? <PostProperty /> : <Navigate replace to='/signin' />} />
            <Route path='user/:fullName' element={localStorage.getItem(`usrTkn`) ? <UserAccount /> : <Navigate replace to='/signin' />} >
              <Route path='overview' element={<UserAccountHome />} />
              <Route path='contracts' element={<Contracts />} />
              <Route path='settings' element={<UserAccountSettings />} />
              <Route path='rented-properties' element={<RentedProperties />} />
              <Route path='owned-properties' element={<OwnedProperties />} />
              <Route path='rent-requests' element={<RentRequestList />} >
                <Route path='' element={<SentRentRequests />} />
                <Route path='all/sent' element={<SentRentRequests />} />
                <Route path='all/recieved' element={<RecievedRentRequests />} />
              </Route>
              <Route path='join-requests' element={<JoinRequestList />} >
              <Route path='' element={<SentJoinRequests />} />
                <Route path='all/sent' element={<SentJoinRequests />} />
                <Route path='all/recieved' element={<RecievedJoinRequests />} />
              </Route>
              <Route path='tenants' element={<ListOfTenants />} />
              <Route path='report-preview' element={<ReportPreview />} />
              <Route path='property/:propertyId' element={<PropertyDetailsUserAccount />} />
              <Route path='contract/:contractId' element={<ContractDetails />} />
              <Route path='rent-request/:rentRequestId' element={<RentRequestDetails />} />
              <Route path='join-request/:joinRequestId' element={<JoinRequestDetails />} />
              <Route path='tenant/:tenantId' element={<TenantInfo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
