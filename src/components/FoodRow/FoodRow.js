import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import FoodCard from '../FoodCard/FoodCard'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding:5
      },
    foodCard:{
        padding:5
    },
    txtTopic:{
        color:'#f3683e',
        fontWeight:'bold'
        
    }  
}));

function FoodRow() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.txtTopic} gutterBottom variant="h5" component="h2">
                เมนูแนะนำ
            </Typography>
            <Divider></Divider>
            <Grid container spacing={12} alignItems='center'>
                <Grid className={classes.foodCard} item lg={3} md={6} sm={12}>
                    <FoodCard/>
                </Grid>
                <Grid className={classes.foodCard} item lg={3}md={6} sm={12}>
                    <FoodCard/>
                </Grid>
                <Grid className={classes.foodCard} item lg={3} md={6} sm={12}>
                    <FoodCard/>
                </Grid>
                <Grid className={classes.foodCard} item lg={3} md={6} sm={12}>
                    <FoodCard/>
                </Grid>
            </Grid>
        </div>
    )
}

export default FoodRow
