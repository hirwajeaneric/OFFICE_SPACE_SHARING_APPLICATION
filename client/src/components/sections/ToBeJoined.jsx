import React from 'react';
import { CustomPropertyCard, FullWidthContainer, HeaderOne, PageSizedContainer, TopLeftFlexAlignedContainer } from '../styled-components/generalComponents';
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { APIS } from '../../utils/APIS';

export default function ToBeJoined() {
  const { propertiesForJoin, isLoading } = useSelector((state) => state.property);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <FullWidthContainer>
      <PageSizedContainer style={{ flexDirection: 'column', margin: '0 0 80px'}}>
        {window.location.pathname === '/' && <HeaderOne style={{color: 'black', textAlign: 'left', width: '100%', margin: '0 0 40px', padding:'0 20px 20px', borderBottom: '1px solid gray'}}>To be Joined</HeaderOne>}
        <TopLeftFlexAlignedContainer style={{ justifyContent: 'center' }}>
        {(propertiesForJoin.length !==0 && isLoading === false)  ?
            <Grid container spacing={4} sx={{ width: '100%' }}>
              {propertiesForJoin.map((property, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <CustomPropertyCard>
                    {property.pictures[0] && <CardMedia component="div" sx={{ pt: '56.25%',}} image={`${APIS.files.property}${property.pictures[0]}`} />}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <span style={{ padding: '4px 12px', background: 'rgba(100, 100, 255, 0.5)' }}>{property.status}</span>
                      <Typography variant="h5" component="h2" style={{ marginTop: '20px' }}>
                        <LocationOn /> <strong>{property.location}</strong>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => navigate(`/property/${property._id}`)}>View Details</Button>
                    </CardActions>
                  </CustomPropertyCard>
                </Grid>
              ))}
            </Grid> :
            <p>No properties yet</p>
          }
        </TopLeftFlexAlignedContainer>
      </PageSizedContainer>
    </FullWidthContainer>
  )
}
