import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 2,
        width: '80%',
        margin: '0 auto'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textReview:{
        paddingLeft:2
    }
}));

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom>
                        ต้มยำกุ้ง
                        </Typography>
                    <Grid container alignItems='center'>
                        <Grid item xs={6}>
                            <Typography variant="h5" gutterBottom>
                                59 บาท
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item>
                                <Rating
                                    size="small"
                                    name="simple-controlled"
                                    value={4}
                                //   onChange={(event, newValue) => {
                                //     setValue(newValue);
                                //   }}
                                />
                                <Typography className={classes.textReview} variant="p" color="textSecondary">
                                ขายแล้ว 102 ชิ้น
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
