import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import PropertyDetailsHome from './pages/PropertyDetailsHome';
import UserAccount from './pages/UserAccount';
import UserAccountHome from './pages/UserAccountHome';
import RentedProperties from './pages/RentedProperties';
import UserAccountSettings from './pages/UserAccountSettings';
import OwnedProperties from './pages/OwnedProperties';
import RentRequestList from './pages/RentRequestList';
import PropertyDetailsUserAccount from './pages/ProperyDetailsUserAccount';
import RentRequestDetails from './pages/RentRequestDetails';
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
import { getOfficeSpaces } from './redux/features/officeSpaceSlice';
import { getRentRequests } from './redux/features/rentRequestsSlice';
import SentRentRequests from './components/sections/SentRentRequests';
import RecievedRentRequests from './components/sections/RecievedRentRequests';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { getUserDetails } from './redux/features/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usrInfo'));
    dispatch(getUserDetails({ userId: user.id}));

    if (user) {
      dispatch(getOfficeSpaces());
      dispatch(getRentRequests({userId: user.id}));
    } else {
      dispatch(getOfficeSpaces());
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
            <Route path='space/:id' element={<PropertyDetailsHome />} />
            
            <Route path='' element={<Auth />}>
              <Route path='signin' element={<Signin />} />
              <Route path='signup' element={<Signup />} />
              <Route path='reset-password' element={<ResetPassword />} />
              <Route path='forgot-password' element={<RequestPasswordReset />} />
            </Route>

            {/* Unrestricted Routes  */}
            <Route path='upload' element={localStorage.getItem(`usrTkn`) ? <PostProperty /> : <Navigate replace to='/signin' />} />
            <Route path='user/:fullName' element={localStorage.getItem(`usrTkn`) ? <UserAccount /> : <Navigate replace to='/signin' />} >
              <Route path='overview' element={<UserAccountHome />} />
              <Route path='settings' element={<UserAccountSettings />} />
              <Route path='rented-slots' element={<RentedProperties />} />
              <Route path='owned-spaces' element={<OwnedProperties />} />
              <Route path='rent-requests' element={<RentRequestList />} >
                <Route path='' element={<SentRentRequests />} />
                <Route path='all/sent' element={<SentRentRequests />} />
                <Route path='all/recieved' element={<RecievedRentRequests />} />
              </Route>
              <Route path='space/:officeSpaceId' element={<PropertyDetailsUserAccount />} />
              <Route path='rent-request/:rentRequestId' element={<RentRequestDetails />} />
              <Route path='tenant/:tenantId' element={<TenantInfo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
