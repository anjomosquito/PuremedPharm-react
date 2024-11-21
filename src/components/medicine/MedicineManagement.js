import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useMedicine } from '../../contexts/MedicineContext';
import { useCategory } from '../../contexts/CategoryContext';

export default function MedicineManagement() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useMedicine();
  const { categories } = useCategory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    lowPrice: '',
    mediumPrice: '',
    highPrice: '',
    description: '',
    categoryId: ''
  });

  const handleOpenDialog = (medicine = null) => {
    if (medicine) {
      setEditingMedicine(medicine);
      setFormData({
        name: medicine.name,
        quantity: medicine.quantity,
        price: medicine.price,
        lowPrice: medicine.lowPrice || '',
        mediumPrice: medicine.mediumPrice || '',
        highPrice: medicine.highPrice || '',
        description: medicine.description,
        categoryId: medicine.categoryId || ''
      });
    } else {
      setEditingMedicine(null);
      setFormData({
        name: '',
        quantity: '',
        price: '',
        lowPrice: '',
        mediumPrice: '',
        highPrice: '',
        description: '',
        categoryId: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMedicine(null);
    setFormData({
      name: '',
      quantity: '',
      price: '',
      lowPrice: '',
      mediumPrice: '',
      highPrice: '',
      description: '',
      categoryId: ''
    });
  };

  const handleSubmit = () => {
    const medicineData = {
      ...formData,
      id: editingMedicine ? editingMedicine.id : Date.now()
    };

    if (editingMedicine) {
      updateMedicine(editingMedicine.id, medicineData);
    } else {
      addMedicine(medicineData);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      deleteMedicine(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ mb: 2, px: 3, pt: 3 }}>
        Medicine Management
      </Typography>
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Medicine
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Regular Price</TableCell>
                <TableCell>Low Price</TableCell>
                <TableCell>Medium Price</TableCell>
                <TableCell>High Price</TableCell>
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
                    <TableCell>
                      {categories.find(cat => cat.id === medicine.categoryId)?.name || 'N/A'}
                    </TableCell>
                    <TableCell>{medicine.quantity}</TableCell>
                    <TableCell>₱{medicine.price}</TableCell>
                    <TableCell>₱{medicine.lowPrice || 'N/A'}</TableCell>
                    <TableCell>₱{medicine.mediumPrice || 'N/A'}</TableCell>
                    <TableCell>₱{medicine.highPrice || 'N/A'}</TableCell>
                    <TableCell>{medicine.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(medicine)} color="primary">
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

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Medicine Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.categoryId}
                label="Category"
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Quantity"
              fullWidth
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Regular Price"
              fullWidth
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Low Price"
              fullWidth
              type="number"
              value={formData.lowPrice}
              onChange={(e) => setFormData({ ...formData, lowPrice: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Medium Price"
              fullWidth
              type="number"
              value={formData.mediumPrice}
              onChange={(e) => setFormData({ ...formData, mediumPrice: e.target.value })}
            />
            <TextField
              margin="dense"
              label="High Price"
              fullWidth
              type="number"
              value={formData.highPrice}
              onChange={(e) => setFormData({ ...formData, highPrice: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingMedicine ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
