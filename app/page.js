"use client"
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Modal, Typography, Stack, TextField, Button } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, setDoc, query, getDoc } from 'firebase/firestore';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        overflowX: 'hidden',
      }}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 400,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ mb: 2, backgroundColor: '#007bff', color: '#fff', '&:hover': { backgroundColor: '#0056b3' } }}
      >
        Add New Item
      </Button>
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          border: '1px solid #333',
          backgroundColor: '#ffffff',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: '#007bff',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ margin: 0 }}>Inventory Items</Typography>
        </Box>
        <Stack
          spacing={2}
          sx={{ padding: 2 }}
        >
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                backgroundColor: '#f0f0f0',
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
                {quantity}
              </Typography>
              <Stack direction = "row" spacing = {2}>
              <Button
                variant="contained"
                onClick={() => addItem(name)}
                sx={{ backgroundColor: '00B4D8', color: '#fff', '&:hover': { backgroundColor: '#00B4D8' } }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => removeItem(name)}
                sx={{ backgroundColor: '#dc3545', color: '#fff', '&:hover': { backgroundColor: '#c82333' } }}
              >
                Remove
              </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
