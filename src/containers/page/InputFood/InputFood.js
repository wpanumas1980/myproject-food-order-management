import React, { useEffect, useState } from 'react';
import { firestore, storage } from '../../../config/firebase';
import { v4 as uuidv4 } from "uuid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DropzoneDialog } from 'material-ui-dropzone';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function InputFood() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({ open: false, files: [] });

  const [allType, setAllType] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
  }
  const handlePrice = (event) => {
    setPrice(event.target.value);
  }

  const handleType = (event) => {
    setType(event.target.value);
  }

  const handleClose = () => {
    setSelectedFiles({ open: false });
  }

  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    setSelectedFiles({ files: files[0], open: false });
  }

  const handleOpen = () => {
    setSelectedFiles({ open: true });
  }

  const onFinish = async (event) => {
    event.preventDefault();

    try {
      const foodId =uuidv4();
      const foodRef = firestore.collection('food');
      const file = selectedFiles.files;
      const fileRef = storage.child(file.name);
      const uploadTaskSnapshot = await fileRef.put(file);
      const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
      setFileUrl(downloadURL);
      foodRef
      .doc(foodId)
      .set({
        name,
        foodId,
        price,
        fileUrl : downloadURL,
        rating:3
      })
      alert('Create successed')
    } catch (error) {
      console.log("ERR ===", error);
      alert("Image uploading failed!");
    }
  }
  //ONE TIME GET FUNCTION
  const getAlltype = () => {
    const allTypeRef = firestore.collection('menu');
    setLoading(true);
    allTypeRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setAllType(items);
      setLoading(false);
    });
  }
  useEffect(() => {
    getAlltype();

  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          เพิ่มรายการอาหาร
        </Typography>
        <form className={classes.form} noValidate onSubmit={onFinish}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="ชื่อ"
                name="name"
                onChange={handleName}
              // autoComplete="type"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="ราคา"
                name="price"
                onChange={handlePrice}
              // autoComplete="type"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">ประเภท</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={type}
                  onChange={handleType}
                  label="type"
                >
                  {allType.map((type, idx) => (<MenuItem value={idx + 1}>{type.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            color="primary"
            variant="contained"
            component="span"
            onClick={handleOpen}
          >
            ใส่รูปภาพ
            </Button>
          <DropzoneDialog
            open={selectedFiles.open}
            onSave={handleSave}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={handleClose}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            เพิ่มข้อมูล
          </Button>
        </form>
      </div>
    </Container>
  );
}