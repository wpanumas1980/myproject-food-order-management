import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "../../auth/Auth";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Button, CardMedia, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { firestore, auth } from '../../config/firebase';


const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    txtPrice: {
        padding: 0,
        fontStyle: 'italic'
    },
    txtName: {
        color: "green",
        padding: 0
    },
    btnBuy: {
        width: '100%',
        background: '#f3683e',
        color: "#ffffff",
        fontSize: 'large'
    }
}));


export default function FoodCard({ food: { price, name, fileUrl, foodId } }) {

    const classes = useStyles();
    // const [expanded, setExpanded] = React.useState(false);
    const {setSelectFood } = useContext(AuthContext);
    // const [loading, setLoading] = useState(false);
    const ref = firestore.collection('menu');

    const history = useHistory();

    const foodDetail = () => {
        setSelectFood(foodId);
        history.push("productdetail");
    }

     //ONE TIME GET FUNCTION
    //  const getFood = () => {
    //     setLoading(true);
    //     ref
    //         .get()
    //         .then((item) => {
    //             const items = item.docs.map((doc) => doc.data());
    //             setMenu(items);
    //             setLoading(false);
    //         });
    // }
    // useEffect(() => {
    //     getMenu();
    //     setLoading(false);
    //     // eslint-disable-next-line
    // }, []);

    return (
        <Grid item xs={12} sm={6} md={3} >
            <Card id={foodId} className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={fileUrl}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    {/* <Grid container justify='space-between'>
                        <Grid item >
                            <Typography variant="p" color="textSecondary">
                                ขายแล้ว: 103
                    </Typography>
                        </Grid>
                        <Grid item>
                            <Rating
                                size="small"
                                name="simple-controlled"
                                value={rating}
                          
                            />
                        </Grid>
                    </Grid> */}
                    <Grid item >
                        <Typography className={classes.txtName} variant="h5">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography className={classes.txtPrice} variant="h5">
                            {price} บาท
                            </Typography>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button 
                    id={foodId} 
                    className={classes.btnBuy} 
                    variant="contained"
                    onClick={foodDetail}
                    >
                        สั่งซื้อ
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
