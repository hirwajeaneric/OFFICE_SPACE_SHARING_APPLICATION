import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { HeaderThree, LeftContainer, RightContainer, TenantCard, TwoSidedContainer } from '../styled-components/generalComponents';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APIS, PROTOCOL } from '../../utils/APIS';
import ResponseComponent from '../sections/ResponseComponent';
import { getContracts } from '../../redux/features/contractSlice';

export default function ContractDetailsForm() {
  // FORM PROCESSING AND RESPONSE PROVISION
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''});
  const [contractDetails, setContractDetails] = useState({})
  const [tenants, setTenants] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const params =  useParams();
  const dispatch = useDispatch();

  // SETTING LOGGED IN USER INFORMATION
  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("usrInfo")));
  }, [])
  

  // FETCHING CONTRACT INFORMATION.
  useEffect(() => {
    axios.get(APIS.contractApis.findById+params.contractId)
    .then(response => {
      setContractDetails(response.data.contract);
      setTenants(response.data.contract.tenants)
    })
    .catch(error => console.log(error));
  },[params])

  // SIGNING A CONTRACT
  const sign = (props) => {
    const {signator, userInfo, signature} = props;
    var formData = {};

    if (signator === 'owner') {
      formData = {
        ownerSignature : signature, 
        ownerSignedOn: new Date()
      };

    } else if (signator === 'tenant 0' || signator === 'tenant 1' || signator === 'tenant 2' || signator === 'tenant 3') {
      formData = {
        tenants : [
          {
            tenantId : userInfo.tenantId,
            tenantName: userInfo.tenantName,
            tenantEmail: userInfo.tenantEmail,
            allowedToRepost: userInfo.allowedToRepost,
            signature: signature,
            signedOn: new Date(),
          }
        ]
      }
    }
    
    setIsProcessing(true);
    axios.put(APIS.contractApis.update+params.contractId, formData)
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing(false);

          dispatch(getContracts(JSON.parse(localStorage.getItem('usrInfo')).id));

          setResponseMessage({ message: 'Contract Signed', severity:'success'});
          setOpen(true);

          setTimeout(() => {
            window.location.reload();
          },2000)
        }
      },3000);
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        // setResponseMessage({ message: error.response.data.msg, severity:'error'})
        // setOpen(true);
        setTimeout(() => {
          window.location.reload();
        },1000)
      }
    })
  }

  const { isLoading } = useSelector((state) => state.contract);
  
  if (isLoading) {
    return (
      <p style={{ marginTop : '30px' }}>Loading...</p>
    )
  }

  return (
    <TwoSidedContainer style={{ flexDirection:'column', background: '#b3e6cc', marginTop: '20px', gap:'20px', width: '100%', padding: '30px', border: '1px solid #d1e0e0', borderRadius: '5px', }}>
      
      {/* GENERAL DETAILS ****************************************************************************************************************************** */}

      <div style={{ display: 'flex', flexDirection:'column', gap: '20px', alignItems:'flex-start', width:'100%'}}>
        <HeaderThree style={{ margin: '0', fontWeight: '600', color:'green', width: '100%', paddingBottom: '10px', borderBottom: '1px solid green' }}>ISAM Rental Agreement</HeaderThree>
        <p style={{ lineHeight: '25px', marginBottom:'20px', fontSize:'90%' }}>
          This Rental Agreement is entered into between tenant(s) listed bellow and the onwer.
          <br/><br/>
          The parties agree to utilize ISMA as a platform to facilitate the rental of property and the formation of shared living arrangements. 
          <br/>The App serves as a digital marketplace connecting individuals seeking to rent houses and those looking for housemates to share the rent price.
          <br/><br/>
          By engaging with the App and entering into this Agreement, both the Tenant and Owner acknowledge and agree to the terms and conditions outlined herein, 
          which govern their rights and obligations regarding the rental and shared living arrangement.
          <br/><br/>
          It is essential to thoroughly review this Agreement and ensure a clear understanding of its contents before proceeding. 
          <br/>This Agreement is designed to protect the interests of both parties, provide clarity on the terms of the rental, 
          and establish a framework for the shared living arrangement facilitated through the App.
          <br/><br/>
          Please note that this Agreement is not a substitute for legal advice. <br/>
          It is recommended that both the Tenant and Owner consult with a qualified attorney to address any specific legal concerns or 
          questions they may have related to this Agreement or their respective rights and obligations.
          <br/><br/>
          By using the App and proceeding with the rental and shared living arrangement, 
          the Tenant and Owner demonstrate their commitment to following the terms of this Agreement and utilizing the App's functionalities 
          to facilitate a smooth and transparent process.
        </p>
        <TwoSidedContainer style={{ flexDirection:'row', width: '100%' }}>
          <LeftContainer style={{ flexDirection: 'column', gap: '20px', marginBottom:'20px', justifyContent:'flex-start', alignItems:'flex-start'}}>
            <p><strong>Created on: </strong> {new Date(contractDetails.createdOn).toUTCString()}</p>
            <p><strong>Contract Status: </strong> {contractDetails.status}</p>            
            <p><strong>Total Payment:</strong> {contractDetails.totalPayment}</p>
            <p><Link to={`${PROTOCOL}://localhost:5555/property/${contractDetails.propertyId}`} style={{ color: 'blue', textDecoration: 'none' }}>View Apartment</Link></p>
          </LeftContainer>
        </TwoSidedContainer>
      </div>


      {/* OWNER ****************************************************************************************************************************** */}
      
      <div style={{ display: 'flex', flexDirection:'column', gap: '20px', alignItems:'flex-start', width:'100%'}}>
        <HeaderThree style={{ margin: '0', fontWeight: '600', color:'green', width: '100%', paddingBottom: '10px', borderBottom: '1px solid green' }}>Owner</HeaderThree>
        <TwoSidedContainer style={{ flexDirection:'row', width: '100%' }}>
          <LeftContainer style={{ flexDirection: 'column', gap: '20px', marginBottom:'20px', justifyContent:'flex-start', alignItems:'flex-start' }}>
            <p><strong>Name:</strong> {contractDetails.ownerName}</p> 
            <p><strong>Email:</strong> {contractDetails.ownerEmail}</p>
            <p><strong>Signature:</strong> {contractDetails.ownerSignature}</p> 
          </LeftContainer>
          <RightContainer style={{ flexDirection: 'column', gap: '20px', marginBottom:'20px', justifyContent:'flex-start', alignItems: 'flex-start' }}>
            <p><strong>Sign date:</strong> {contractDetails.ownerSignedOn && new Date(contractDetails.ownerSignedOn).toUTCString()}</p>
            {contractDetails.ownerId === loggedInUser.id && 
              <>
                {
                  contractDetails.ownerSignature !== 'Signed' ? 
                  <>
                    {isProcessing ? 
                      <Button disabled size='small' variant='contained' color='primary' 
                        style={{ marginBottom:'30px' }}
                        >Processing...
                      </Button>
                    :
                      <Button size='small' variant='contained' color='primary' 
                        style={{ marginBottom:'30px' }}
                        onClick={() => {
                          sign({
                            signator: 'owner', 
                            userInfo: {}, 
                            signature : 'Signed'
                          });
                        }}
                        >Sign
                      </Button>
                    }
                  </> 
                  :
                  <> 
                    {isProcessing ?
                      <Button disabled size='small' variant='contained' color='primary' style={{ marginBottom:'30px' }}
                        >Processing...
                      </Button> 
                      :
                      <Button size='small' variant='contained' color='primary' 
                        style={{ marginBottom:'30px' }}
                        onClick={() => {
                          sign({
                            signator: 'owner', 
                            userInfo: {},
                            signature : 'Withdrew'
                          });
                        }}
                        >Withdraw
                      </Button>
                    }
                  </>
                }
              </>
            } 
          </RightContainer>
        </TwoSidedContainer>
      </div>


      {/* TENANTS ****************************************************************************************************************************** */}

      <HeaderThree style={{ margin: '0', fontWeight: '600', color:'green', width: '100%', paddingBottom: '10px', borderBottom: '1px solid green' }}>Tenants</HeaderThree>
      <TwoSidedContainer style={{ flexDirection:'row', width: '100%' }}>
        {tenants.length !== 0 && tenants.map((tenant, index) => (
          <TenantCard key={index}>
            <h4>Tenant {index+1}</h4>
            <p><strong>Name:</strong> {tenant.tenantName}</p> 
            <p><strong>Email:</strong> {tenant.tenantEmail}</p>
            <p><strong>Phone:</strong> {tenant.tenantPhone}</p>
            <p><strong>Allowed To Share:</strong> {tenant.allowedToRepost}</p>
            <p><strong>Signature:</strong> {tenant.signature}</p> 
            <p><strong>Sign date:</strong> {tenant.signedOn && new Date(tenant.signedOn).toUTCString()}</p>
            {
              tenant.withDrewOn && 
                <div>
                  <p><strong>Withdrew On :</strong> {tenant.WithDrewOn}</p>
                  <p><strong>Reason for withdrawal:</strong> {tenant.withDrawalReason}</p>
                </div>
            }
            
            {
              tenant.tenantId === loggedInUser.id &&
              <>
              {tenant.signature !== 'Signed' ? 
                <>
                  {isProcessing ?
                    <Button disabled size='small' variant='contained' color='primary' style={{ marginBottom:'30px' }}
                      >Processing...
                    </Button> 
                  :
                    <Button size='small' variant='contained' color='primary' 
                      style={{ marginBottom:'30px' }}
                      onClick={() => {
                        sign({
                          signator: `tenant ${index}`, 
                          userInfo: tenant,
                          signature : 'Signed'
                        });
                      }}
                    >Sign
                    </Button>
                  }
                </> 
                : 
                <>
                  {isProcessing ?
                    <Button disabled size='small' variant='contained' color='primary' style={{ marginBottom:'30px' }}
                      >Processing...
                    </Button> 
                  :
                    <Button size='small' variant='contained' color='primary' 
                      style={{ marginBottom:'30px' }}
                      onClick={() => {
                        sign({
                          signator: `tenant ${index+1}`, 
                          userInfo: tenant, 
                          signature : 'Withdrew'
                        });
                      }}
                    >Withdraw
                    </Button>
                  }
                </> 
              }
              </>
            }
          </TenantCard>
        ))}
      </TwoSidedContainer>
      
      {/* RESPONSE MESSAGE DISPLAYER ****************************************************************************************************************************** */}
      <ResponseComponent 
        message={responseMessage.message} 
        severity={responseMessage.severity}
        open={open} 
        handleClose={handleClose} 
      />
    </TwoSidedContainer>
  )
}
