import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import img from '../../img/f-001.jpg';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        paddingTop: 5
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    btnBuy: {
        width: '100%',
        background: '#f3683e',
        color: "#ffffff",
        fontSize: 'large'
    },
    txtPrice: {
        padding: 0,
        fontStyle:'italic'
    },
    txtName: {
        color: "green",
        padding: 0
    }
}));

export default function FoodCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={img}
                title="Paella dish"
            />
            <Grid container justify='space-between' style={{ padding: 5 }}>
                <Grid item >
                    <Typography variant="p" color="textSecondary">
                        ขายแล้ว: 103
                    </Typography>
                </Grid>
                <Grid item>
                    <Rating
                        size="small"
                        name="simple-controlled"
                        value={4}
                    //   onChange={(event, newValue) => {
                    //     setValue(newValue);
                    //   }}
                    />
                </Grid>
            </Grid>
            <Grid container justify='space-between' style={{ padding: 5 }}>
                <Grid item >
                    <Typography className={classes.txtName} variant="h5">
                        ต้มยำกุ้ง
            </Typography>
                </Grid>
                <Typography className={classes.txtPrice} variant="h5">
                    59 บาท
            </Typography>
            </Grid>
            <CardActions>
                <Button className={classes.btnBuy} variant="contained">
                    สั่งซื้อ
                </Button>
            </CardActions>
        </Card>
    );
}