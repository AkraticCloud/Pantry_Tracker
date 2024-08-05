'use client'
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Modal, Stack, TextField, Typography, Button, ThemeProvider} from '@mui/material'
import {collection, doc, getDocs, deleteDoc, getDoc, setDoc, query} from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    })
    setInventory(inventoryList)
  }
  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item) =>{ 
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    }
    else{
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  const removeItem = async (item) =>{ 
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if(quantity === 1){
        await deleteDoc(docRef)
      }
      else{
          await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (

    <Box
      width="100vw"
      height="100vh"
      display="flex"
      border={'16px solid #333'}
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={4}
    >
      <Modal
        open={open}
        onClose={handleClose}>
        <Box
          position='absolute'
          top='50%'
          left="50%"
          width={400}
          bgcolor="white"
          borderRadius={6}
          boxShadow={4}
          p={4}
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          sx={{
            transform: 'translate(-50%,-50%)',
          }}>
          <Stack width="100%" direction={'row'} spacing={1}>
            <TextField
              variant='outlined'
              label='Add Item Name'
              fullWidth
              helperText=''
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              } } />
            <Button
              variant="contained" color="success"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              } }>Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant='contained'
        color='success'
        onClick={() => {
          handleOpen()
        } }>
        Add New Item
      </Button>
      <Box
        border='1px solid #333'
        borderRadius={4}>
        <Box
          width="100%"
          height="100px"
          bgcolor='#ADD8E6'
          borderRadius={4}
          display='flex'
          flexDirection='column'
          alignItems="center"
          justifyContent="center"
          padding={2}
          >
          <Typography variant="h2" color='333'>
            Pantry List
          </Typography>
        </Box>
        <Stack
          direction='column'
          spacing={2}
          width="800px"
          height='300px'
          overflow='auto'>
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width='100%'
              minHeight='125px'
              display='flex'
              borderRadius={4}
              alignItems='center'
              justifyContent="space-between"
              bgcolor='#f0f0f0'
              color={'secondary'}
              padding={5}
            >
              <Typography variant='h3' color='#333' textAlign='center' textTransform={'capitalize'}>
                {name}
              </Typography>
              <Typography variant='h3' color='#333' textAlign='center'>
                {quantity}
              </Typography>
              <Stack
                direction='row'
                spacing={2}>
                <Button
                  variant='contained' disableElevation
                  color='primary'
                  onClick={() => {
                    addItem(name)
                  } }>
                  Add
                </Button>
                <Button
                  variant='contained' disableElevation
                  color='error'
                  onClick={() => {
                    removeItem(name)
                  } }
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}