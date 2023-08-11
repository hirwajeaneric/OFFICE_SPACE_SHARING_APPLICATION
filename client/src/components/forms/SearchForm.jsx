import React, { useState } from 'react'
import {SearchFromContainer} from '../styled-components/formsStyledComponent';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import { CustomFormControlOne } from '../styled-components/generalComponents';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { officeSpaceTypes } from '../../utils/OfficeSpaceTypes';

export default function SearchForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [officeSpaceType, setOfficeSpaceType] = useState('');
    const [location, setLocation] = useState('');
  
    const handleChangeOfficeSpaceType = (event) => {
        setOfficeSpaceType(event.target.value);
    };

    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
    };

    const executeSearch = e => {
        e.preventDefault();

        let searchData = {
            officeSpaceType: officeSpaceType,
            location: location,
        }
        dispatch({ type: 'officeSpace/searchOfficeSpace', payload: searchData });        
        navigate('/search');   
    }

    const { locationsOfAvailableOfficeSpaces } = useSelector(state => state.officeSpace);

    return (
    <SearchFromContainer style={{ margin: '20px 0'}} onSubmit={executeSearch}>

        {/* Property Type  */}
        <CustomFormControlOne size='medium' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="property-type">Space activity Type</InputLabel>
            <Select
                labelId="officeSpaceType"
                id="officeSpaceType"
                size='medium'
                sx={{ background: 'white' }}
                value={officeSpaceType}
                onChange={handleChangeOfficeSpaceType}
                label="Property Type"
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {officeSpaceTypes.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
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
                {locationsOfAvailableOfficeSpaces.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </CustomFormControlOne>
        
        {/* Search Button  */}
        {window.location.pathname === '/search' ? 
            <Button type='submit' variant="contained" size='large' startIcon={<GridSearchIcon />}>Search</Button> : 
            <Button type='submit' variant="contained" size='large' startIcon={<GridSearchIcon style={{ fontSize: '270%'}}/>}></Button>
        }   
    </SearchFromContainer>
  )
}
