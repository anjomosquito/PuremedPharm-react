import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Chip,
} from '@mui/material';

// Sample data - replace with actual data from your backend
const samplePurchases = [
  {
    id: 1,
    date: '2024-01-15',
    medicine: 'Paracetamol',
    quantity: 100,
    totalPrice: 500.00,
    status: 'Completed',
    supplier: 'PharmaCorp Inc.'
  },
  {
    id: 2,
    date: '2024-01-14',
    medicine: 'Amoxicillin',
    quantity: 50,
    totalPrice: 750.00,
    status: 'Pending',
    supplier: 'MedSupply Co.'
  },
  // Add more sample data as needed
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

export default function PurchaseManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Purchase Management
      </Typography>
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="purchase management table">
            <TableHead>
              <TableRow>
                <TableCell>Purchase ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Medicine</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price ($)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Supplier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {samplePurchases
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((purchase) => (
                  <TableRow hover key={purchase.id}>
                    <TableCell>{purchase.id}</TableCell>
                    <TableCell>{purchase.date}</TableCell>
                    <TableCell>{purchase.medicine}</TableCell>
                    <TableCell>{purchase.quantity}</TableCell>
                    <TableCell>{purchase.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={purchase.status}
                        color={getStatusColor(purchase.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{purchase.supplier}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={samplePurchases.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
