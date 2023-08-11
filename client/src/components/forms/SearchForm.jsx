import React, { useState } from 'react'
import {SearchFromContainer} from '../styled-components/formsStyledComponent';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import { CustomFormControlOne } from '../styled-components/generalComponents';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function SearchForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [propertyType, setPropertyType] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
  
    const handleChangePropertyType = (event) => {
        setPropertyType(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
    };

    const executeSearch = e => {
        e.preventDefault();

        let searchData = {
            propertyType: propertyType,
            status: status,
            location: location,
        }

        dispatch({ type: 'property/searchProperty', payload: searchData });

        console.log(searchData);
        
        navigate('/search');   
    }

    return (
    <SearchFromContainer style={{ margin: '20px 0'}} onSubmit={executeSearch}>

        {/* Property Type  */}
        <CustomFormControlOne sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="property-type">Property Type</InputLabel>
            <Select
                labelId="property-type"
                id="property-type"
                sx={{ background: 'white' }}
                value={propertyType}
                onChange={handleChangePropertyType}
                label="Property Type"
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                <MenuItem value={'1 Bedroom only'}>1 Bed room only</MenuItem>
                <MenuItem value={'1 Bedroom + Living Room'}>1 Bedroom + Living Room</MenuItem>
                <MenuItem value={'2 Bedrooms + Living Room'}>2 Bedrooms + Living Room</MenuItem>
                <MenuItem value={'3 Bedrooms + Living Room'}>3 Bedrooms + Living Room</MenuItem>
                <MenuItem value={'4 Bedrooms + Living Room'}>4 Bedrooms + Living Room</MenuItem>
            </Select>
        </CustomFormControlOne>
        
        {/* Status  */}
        <CustomFormControlOne sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="property-status">Property Status</InputLabel>
            <Select
                labelId="property-status"
                id="property-status"
                sx={{ background: 'white' }}
                value={status}
                onChange={handleChangeStatus}
                label="Property Status"
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                <MenuItem value={'For Rent'}>For Rent</MenuItem>
                <MenuItem value={'For Join'}>For Join</MenuItem>
            </Select>
        </CustomFormControlOne>

        {/* Location  */}
        <CustomFormControlOne sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="location">Location</InputLabel>
            <Select
                labelId="location"
                id="location"
                sx={{ background: 'white' }}
                value={location}
                onChange={handleChangeLocation}
                label="location"
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                <MenuItem value={'Kacyiru'}>Kacyiru</MenuItem>
                <MenuItem value={'Remera'}>Remera</MenuItem>
                <MenuItem value={'Gikondo'}>Gikondo</MenuItem>
                <MenuItem value={'Kibagabaga'}>Kibagabaga</MenuItem>
                <MenuItem value={'Gasabo'}>Gasabo</MenuItem>
                <MenuItem value={'Gishushu'}>Gishushu</MenuItem>
                <MenuItem value={'Kimironko'}>Kimironko</MenuItem>
                <MenuItem value={'Kicukiro'}>Kicukiro</MenuItem>
            </Select>
        </CustomFormControlOne>
        
        {/* Search Button  */}
        {window.location.pathname === '/search' ? 
            <Button type='submit' variant="contained" size='large' startIcon={<GridSearchIcon />}> Search</Button> : 
            <Button type='submit' variant="contained" size='large' startIcon={<GridSearchIcon />}></Button>
        }   
    </SearchFromContainer>
  )
}
