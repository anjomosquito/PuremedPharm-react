import React, { useState } from 'react';
import { useMedicine } from '../../contexts/MedicineContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Alert,
  TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

export default function MedicineManagement() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine, generateReport } = useMedicine();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reportDateRange, setReportDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [reportData, setReportData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      quantity: '',
      price: '',
      description: ''
    });
    setError('');
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (medicine) => {
    setSelectedMedicine(medicine);
    setFormData(medicine);
    setError('');
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenReportDialog(false);
    setSelectedMedicine(null);
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.quantity || !formData.price) {
      setError('Please fill in all required fields');
      return false;
    }
    if (isNaN(formData.quantity) || formData.quantity <= 0) {
      setError('Quantity must be a positive number');
      return false;
    }
    if (isNaN(formData.price) || formData.price <= 0) {
      setError('Price must be a positive number');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (openAddDialog) {
      addMedicine(formData);
    } else if (openEditDialog && selectedMedicine) {
      updateMedicine(selectedMedicine.id, formData);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      deleteMedicine(id);
    }
  };

  const handleGenerateReport = () => {
    const report = generateReport(reportDateRange.startDate, reportDateRange.endDate);
    setReportData(report);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
        width: '100%',
        m: 0,
        p: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, px: 3, pt: 3 }}>
        Medicine Management
      </Typography>
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Button
              variant="contained"
              startIcon={<AssessmentIcon />}
              onClick={() => setOpenReportDialog(true)}
              sx={{ mr: 2 }}
            >
              Generate Report
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
            >
              Add Medicine
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.quantity}</TableCell>
                    <TableCell>${medicine.price}</TableCell>
                    <TableCell>{medicine.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenEditDialog(medicine)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(medicine.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={medicines.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {/* Add/Edit Dialog */}
        <Dialog open={openAddDialog || openEditDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {openAddDialog ? 'Add New Medicine' : 'Edit Medicine'}
          </DialogTitle>
          <DialogContent>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              autoFocus
              margin="dense"
              label="Medicine Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {openAddDialog ? 'Add' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Report Dialog */}
        <Dialog
          open={openReportDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Activity Report</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={reportDateRange.startDate}
                  onChange={(e) =>
                    setReportDateRange({ ...reportDateRange, startDate: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={reportDateRange.endDate}
                  onChange={(e) =>
                    setReportDateRange({ ...reportDateRange, endDate: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  onClick={handleGenerateReport}
                  fullWidth
                  sx={{ height: '56px' }}
                >
                  Generate
                </Button>
              </Grid>
            </Grid>

            {reportData && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2">Total Activities</Typography>
                      <Typography variant="h6">{reportData.totalActivities}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2">Added</Typography>
                      <Typography variant="h6">{reportData.addCount}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2">Updated</Typography>
                      <Typography variant="h6">{reportData.updateCount}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2">Deleted</Typography>
                      <Typography variant="h6">{reportData.deleteCount}</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>
                  Detailed Activity Log
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reportData.activities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            {new Date(activity.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>{activity.action}</TableCell>
                          <TableCell>{activity.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
