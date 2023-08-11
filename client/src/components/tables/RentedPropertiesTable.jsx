import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  {   
    field: '_id', 
    headerName: '_ID', 
    hide:true
  },
  {
    field: 'rentPrice',
    headerName: 'Price',
    width: 80,
  },
  {
    field: 'propertyType',
    headerName: 'Type',
    width: 130,
  },
  {
    field: 'bedRooms',
    headerName: 'Bed rooms',
    width: 90,
  },
  {
    field: 'bathRooms',
    headerName: 'Bath rooms',
    width: 90,
  },
  {
    field: 'furnished',
    headerName: 'Furnished',
    width: 80,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 80,
  },
  {
    field: 'dimensions',
    headerName: 'Dimensions',
    width: 95,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 110,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 70,
    renderCell: (params) => <TableActions parameters= {params} />
  },
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export const TableStyles = {
  padding: '0px',
  width: '100%',
  height: '300px',
  background: 'white',
  marginTop: '20px' 
}

var rows = [];

export default function RentedPropertiesTable({data}) {
  rows = data;

  return (
    <Box sx={TableStyles}>
      <DataGrid
        rowHeight={38}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{newEditingApi: true}}
        components={{Toolbar: CustomToolbar}}
      />
    </Box>
      
  );
};

// Table actions
const TableActions = ({parameters}) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton onClick={() => {  
          navigate(`/user/${params.fullName}/property/${parameters.row._id}`);
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
}