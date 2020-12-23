import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../../auth/Auth";
import Grid from '@material-ui/core/Grid';
import { v4 as uuidv4 } from "uuid";
// import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { firestore } from '../../../config/firebase';
import {
    Button,
    Card,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        paddingTop: 2,
        width: '60%',
        margin: '0 auto'
    },
    textReview: {
        paddingLeft: 2
    },
    textFoodName: {
        color: '#fe4b11'
    },
    txtInput: {
        width: 60,
        height: '20px',
        margin: 5,
        outline: 'none',
        // border:'none',
        textAlign: 'center'

    }

}));


export default function ProductDetail() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const { currentUser, selectFood } = useContext(AuthContext);
    const [qty, setQty] = useState(1)
    const [foodSize, setFoodSize] = useState('1');
    const [spicy, setSpicy] = useState('2');
    const [food, setFood] = useState([]);
    const [option,setOption] = useState('');
    const [egg, setEgg] = useState('');
    
    const history = useHistory();
   
    const handleQty = (event) =>{
        setQty(event.target.value);
    }
    const handleOption = (event) =>{
        setOption(event.target.value);
    }
    const handleEgg = (event) =>{
        setEgg(event.target.value);
    }
    const handleSize = (event) => {
        setFoodSize(event.target.value);
    };
    const handleSpicy = (event) => {
        setSpicy(event.target.value);
        console.log(event.target.value);
    };

    const handleOrder = () => {
        try {
            const OrderRef = firestore.collection('foodOrder');
            const orderId = uuidv4();

            OrderRef
                .doc(orderId)
                .set({
                    orderId,
                    name,
                    totalPrice:qty*price,
                    foodSize,
                    foodId,
                    spicy,
                    qty,
                    fileUrl,
                    // totalSale: totalSale + qty,
                    option,
                    egg,
                    status:'อยู่ระหว่างดำเนินการ',
                    email:currentUser.email
                })
            alert('Create successed')
            history.push('/');
        } catch (error) {
            console.log("ERR ===", error);
            alert("Image uploading failed!");
        }
    }

    //ONE TIME GET FUNCTION
    const getFoodById = () => {
        const foodRef = firestore.collection('food');
        setLoading(true);
        foodRef
            .where('foodId', '==', selectFood)
            .get()
            .then((item) => {
                const items = item.docs.map((doc) => doc.data());
                setFood(items);
                setLoading(false);
            });
    }

    useEffect(() => {
        getFoodById();
    }, [])
 
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                }}
            >
                <h1>Loading ...</h1>
            </div>
        );
    }

    const { fileUrl, price, name, totalSale,foodId } = food[0];

    return (
        <div className={classes.root}>
            <Card>
                <Grid container alignItems='center' spacing={2} style={{ padding: 5 }}>
                    <Grid item xs={6}>
                        <img
                            src={fileUrl}
                            width='100%'
                            alt='food'
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Typography className={classes.textFoodName} variant="h4" gutterBottom>
                            {name}
                        </Typography>
                        <Grid container alignItems='center'>
                            <Grid item xs={5}>
                                <Typography variant="h4" gutterBottom>
                                    {price} บาท
                            </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Grid item >
                                    {/* <Rating
                                        size="small"
                                        name="simple-controlled"
                                        value={4}
                                      onChange={(event, newValue) => {
                                        setValue(newValue);
                                      }}
                                    /> */}
                                    <Typography className={classes.textReview} variant="p" color="textSecondary">
                                        ขายแล้ว {totalSale} ชิ้น
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                <Typography variant="h6" color="textSecondary">
                                    ขนาด
                                </Typography>
                            </FormLabel>
                            <RadioGroup 
                            row name="size" 
                            value={foodSize} 
                            onChange={handleSize}
                            >
                                <FormControlLabel value="1" control={<Radio color="primary" />} label="ธรรมดา" />
                                <FormControlLabel value="2" control={<Radio color="primary" />} label="พิเศษ" />
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                        <FormControl >
                            <FormLabel >
                                <Typography variant="h6" color="textSecondary">
                                    ไข่
                                </Typography>
                            </FormLabel>
                            <RadioGroup row name="egg" onChange={handleEgg}>
                                <FormControlLabel value="1" control={<Radio color="primary" />} label="ไข่ดาว" />
                                <FormControlLabel value="2" control={<Radio color="primary" />} label="ไข่เจียว" />
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                        <FormControl>
                            <FormLabel>
                                <Typography variant="h6" color="textSecondary">
                                    ความเผ็ด
                                </Typography>
                            </FormLabel>
                            <RadioGroup row name="spicy" value={spicy} onChange={handleSpicy}>
                                <FormControlLabel value={'1'} control={<Radio color="secondary" />} label="1" labelPlacement="top" />
                                <FormControlLabel value={'2'} control={<Radio color="secondary" />} label="2" labelPlacement="top" />
                                <FormControlLabel value={'3'} control={<Radio color="secondary" />} label="3" labelPlacement="top" />
                                <FormControlLabel value={'4'} control={<Radio color="secondary" />} label="4" labelPlacement="top" />
                                <FormControlLabel value={'5'} control={<Radio color="secondary" />} label="5" labelPlacement="top" />
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                        <FormControl>
                            <FormLabel>
                                <Typography variant="h6" color="textSecondary">
                                    เพิ่มเติม
                                </Typography>
                            </FormLabel>
                        </FormControl>
                        <TextField
                            id="outlined-multiline-static"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                            onChange={handleOption}
                        />
                        <Divider />
                        <Grid container style={{ paddingTop: 5 }}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="textSecondary">
                                    จำนวน
                                </Typography>
                                <input
                                    className={classes.txtInput}
                                    type="number"
                                    value={qty}
                                    onChange={handleQty}
                                />
                                <Button size="small" variant="contained" color="primary" onClick={handleOrder}>
                                    สั่งอาหาร
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}
