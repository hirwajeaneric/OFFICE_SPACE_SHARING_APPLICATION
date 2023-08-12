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
    field: 'price',
    headerName: 'Price',
    width: 120,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
  },
  {
    field: 'occupantName',
    headerName: 'Occupant',
    width: 200,
  },
  {
    field: 'occupantPhone',
    headerName: 'Phone of occupant',
    width: 150,
  },
  {
    field: 'dimensions',
    headerName: 'Dimensions',
    width: 95,
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
  height: '250px',
  background: 'white', 
}

var rows = [];

export default function SlotsTable({data}) {
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
          navigate(`/user/${params.fullName}/slot/${parameters.row._id}`);
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
}