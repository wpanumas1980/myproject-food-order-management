import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Button, CardMedia, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


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

export default function ProductCard({ price, productName, detail }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Grid container justify='space-between'>
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
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify='space-between' style={{ marginTop: "5px" }}>
                        <Grid item >
                            <Typography className={classes.txtName} variant="h5">
                                ต้มยำกุ้ง
                            </Typography>
                        </Grid>
                            <Typography className={classes.txtPrice} variant="h5">
                            59 บาท
                            </Typography>
                        </Grid>
                </CardContent>
                <CardActions>
                    <Button className={classes.btnBuy} variant="contained">
                        สั่งซื้อ
                </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
